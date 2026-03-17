import {
  CLIENT_ID,
  AUTH_URL,
  TOKEN_URL,
  REDIRECT_URI,
  SCOPES,
} from '../const';
import { generateCodeVerifier, generateCodeChallenge, generateState } from './pkce';
import type { TokenData } from '../types';

const TOKEN_REFRESH_BUFFER_MS = 60_000; // refresh 1 min before expiry
const AUTH_TIMEOUT_MS = 120_000; // 2 min for user to complete OAuth

/**
 * Encode a state payload as base64url JSON.
 * We embed the code_verifier so that callback.html (running on the registered
 * redirect URI origin) can perform the token exchange — bypassing the CORS
 * restriction that blocks the exchange from the HA browser origin.
 */
function encodeStatePayload(csrf: string, verifier: string, clientId: string, redirectUri: string): string {
  const json = JSON.stringify({ s: csrf, v: verifier, c: clientId, r: redirectUri });
  return btoa(json).replace(/\+/g, '-').replace(/\//g, '_').replace(/=/g, '');
}

function decodeStatePayload(state: string): { s: string; v?: string; c?: string; r?: string } | null {
  try {
    const padded = state.replace(/-/g, '+').replace(/_/g, '/');
    return JSON.parse(atob(padded)) as { s: string };
  } catch {
    return null;
  }
}

export class OAuthManager {
  private _messageListener: ((event: MessageEvent) => void) | null = null;
  private _pendingCsrf: string | null = null;
  private _popup: Window | null = null;

  // ─── Storage key ────────────────────────────────────────────────────────────

  private _storageKey(clientId?: string): string {
    return `parqet_card_auth_${clientId ?? CLIENT_ID}`;
  }

  // ─── Token storage ──────────────────────────────────────────────────────────

  getStoredToken(clientId?: string): TokenData | null {
    try {
      const raw = localStorage.getItem(this._storageKey(clientId));
      return raw ? (JSON.parse(raw) as TokenData) : null;
    } catch {
      return null;
    }
  }

  isTokenValid(clientId?: string): boolean {
    const token = this.getStoredToken(clientId);
    return !!token && token.expires_at > Date.now() + TOKEN_REFRESH_BUFFER_MS;
  }

  clearToken(clientId?: string): void {
    localStorage.removeItem(this._storageKey(clientId));
  }

  // ─── Auth flow ──────────────────────────────────────────────────────────────

  /**
   * Open the Parqet OAuth popup. Resolves when the user completes auth.
   *
   * The code_verifier is embedded in the state parameter so that
   * callback.html (on cubinet-code.github.io) can perform the token exchange
   * directly — avoiding CORS issues when calling from the HA browser origin.
   *
   * Pass a pre-opened popup window to avoid browser popup blocking
   * (window.open must be called synchronously in the user-gesture handler,
   * before any awaits).
   */
  async startAuth(clientId?: string, redirectUri?: string, preOpenedPopup?: Window | null): Promise<TokenData> {
    const resolvedClientId = clientId ?? CLIENT_ID;
    const resolvedRedirectUri = redirectUri ?? REDIRECT_URI;

    const verifier = await generateCodeVerifier();
    const challenge = await generateCodeChallenge(verifier);
    const csrf = generateState();
    this._pendingCsrf = csrf;

    // Embed verifier + credentials in state so callback.html can exchange the code
    const stateParam = encodeStatePayload(csrf, verifier, resolvedClientId, resolvedRedirectUri);

    const params = new URLSearchParams({
      response_type: 'code',
      client_id: resolvedClientId,
      redirect_uri: resolvedRedirectUri,
      scope: SCOPES,
      code_challenge: challenge,
      code_challenge_method: 'S256',
      state: stateParam,
    });

    const authUrl = `${AUTH_URL}?${params}`;

    // Navigate the pre-opened popup, or open a new one as fallback
    let popup: Window | null;
    if (preOpenedPopup && !preOpenedPopup.closed) {
      preOpenedPopup.location.href = authUrl;
      popup = preOpenedPopup;
    } else {
      popup = window.open(authUrl, 'parqet-auth', 'width=520,height=720,scrollbars=yes,resizable=yes');
    }
    this._popup = popup;

    return new Promise<TokenData>((resolve, reject) => {
      const timeout = setTimeout(() => {
        this._cleanup();
        popup?.close();
        reject(new Error('Authorization timed out. Please try again.'));
      }, AUTH_TIMEOUT_MS);

      this._messageListener = (event: MessageEvent) => {
        if (event.data?.type !== 'parqet-oauth') return;

        const msg = event.data as {
          type: string;
          state?: string;
          token?: Record<string, unknown>;
          error?: string;
        };

        // Validate CSRF — callback.html sends back just the csrf portion
        const returnedCsrf = msg.state;
        if (returnedCsrf !== this._pendingCsrf) {
          this._cleanup();
          clearTimeout(timeout);
          popup?.close();
          reject(new Error('OAuth state mismatch — possible CSRF attack.'));
          return;
        }

        this._cleanup();
        clearTimeout(timeout);
        popup?.close();

        if (msg.error) {
          reject(new Error(`Authorization failed: ${msg.error}`));
          return;
        }

        if (!msg.token) {
          reject(new Error('No token received from authorization callback.'));
          return;
        }

        const token = this._normalizeToken(msg.token);
        this._storeToken(token, resolvedClientId);
        resolve(token);
      };

      window.addEventListener('message', this._messageListener);
    });
  }

  // ─── Token refresh ──────────────────────────────────────────────────────────

  async refreshToken(clientId?: string): Promise<TokenData> {
    const resolvedClientId = clientId ?? CLIENT_ID;
    const stored = this.getStoredToken(resolvedClientId);
    if (!stored?.refresh_token) {
      this.clearToken(resolvedClientId);
      throw new Error('No refresh token available. Please reconnect.');
    }

    const resp = await fetch(TOKEN_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: new URLSearchParams({
        grant_type: 'refresh_token',
        refresh_token: stored.refresh_token,
        client_id: resolvedClientId,
      }),
    });

    if (!resp.ok) {
      this.clearToken(resolvedClientId);
      throw new Error(`Token refresh failed (${resp.status}). Please reconnect.`);
    }

    const data = await resp.json();
    const token = this._normalizeToken(data);
    this._storeToken(token, resolvedClientId);
    return token;
  }

  /**
   * Return a valid access token, refreshing if needed.
   * Throws if refresh fails (caller should show auth prompt).
   */
  async getValidToken(clientId?: string): Promise<string> {
    if (this.isTokenValid(clientId)) {
      return this.getStoredToken(clientId)!.access_token;
    }
    const refreshed = await this.refreshToken(clientId);
    return refreshed.access_token;
  }

  // ─── Private ────────────────────────────────────────────────────────────────

  private _normalizeToken(data: Record<string, unknown>): TokenData {
    const expiresIn = (data['expires_in'] as number) ?? 3600;
    return {
      access_token: data['access_token'] as string,
      refresh_token: data['refresh_token'] as string | undefined,
      token_type: (data['token_type'] as string) ?? 'Bearer',
      expires_in: expiresIn,
      expires_at: Date.now() + expiresIn * 1000,
    };
  }

  private _storeToken(token: TokenData, clientId?: string): void {
    localStorage.setItem(this._storageKey(clientId), JSON.stringify(token));
  }

  private _cleanup(): void {
    if (this._messageListener) {
      window.removeEventListener('message', this._messageListener);
      this._messageListener = null;
    }
    this._pendingCsrf = null;
    this._popup = null;
  }
}

/** Singleton OAuth manager — shared across all card instances. */
export const oauthManager = new OAuthManager();

// Export helpers for use in tests
export { decodeStatePayload, encodeStatePayload };
