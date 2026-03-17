import {
  CLIENT_ID,
  AUTH_URL,
  TOKEN_URL,
  REDIRECT_URI,
  SCOPES,
  STORAGE_KEY,
} from '../const';
import { generateCodeVerifier, generateCodeChallenge, generateState } from './pkce';
import type { TokenData } from '../types';

const TOKEN_REFRESH_BUFFER_MS = 60_000; // refresh 1 min before expiry
const AUTH_TIMEOUT_MS = 120_000; // 2 min for user to complete OAuth

export class OAuthManager {
  private _messageListener: ((event: MessageEvent) => void) | null = null;
  private _pendingState: string | null = null;
  private _popup: Window | null = null;

  // ─── Token storage ──────────────────────────────────────────────────────────

  getStoredToken(): TokenData | null {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      return raw ? (JSON.parse(raw) as TokenData) : null;
    } catch {
      return null;
    }
  }

  isTokenValid(): boolean {
    const token = this.getStoredToken();
    return !!token && token.expires_at > Date.now() + TOKEN_REFRESH_BUFFER_MS;
  }

  clearToken(): void {
    localStorage.removeItem(STORAGE_KEY);
  }

  // ─── Auth flow ──────────────────────────────────────────────────────────────

  /** Open the Parqet OAuth popup. Resolves when the user completes auth. */
  async startAuth(): Promise<TokenData> {
    const verifier = await generateCodeVerifier();
    const challenge = await generateCodeChallenge(verifier);
    const state = generateState();
    this._pendingState = state;

    const params = new URLSearchParams({
      response_type: 'code',
      client_id: CLIENT_ID,
      redirect_uri: REDIRECT_URI,
      scope: SCOPES,
      code_challenge: challenge,
      code_challenge_method: 'S256',
      state,
    });

    const popup = window.open(
      `${AUTH_URL}?${params}`,
      'parqet-auth',
      'width=520,height=720,scrollbars=yes,resizable=yes',
    );
    this._popup = popup;

    return new Promise<TokenData>((resolve, reject) => {
      const timeout = setTimeout(() => {
        this._cleanup();
        popup?.close();
        reject(new Error('Authorization timed out. Please try again.'));
      }, AUTH_TIMEOUT_MS);

      this._messageListener = async (event: MessageEvent) => {
        if (event.data?.type !== 'parqet-oauth') return;

        const { code, state: returnedState, error } = event.data as {
          type: string;
          code?: string;
          state?: string;
          error?: string;
        };

        if (returnedState !== this._pendingState) {
          this._cleanup();
          clearTimeout(timeout);
          popup?.close();
          reject(new Error('OAuth state mismatch — possible CSRF attack.'));
          return;
        }

        if (error) {
          this._cleanup();
          clearTimeout(timeout);
          popup?.close();
          reject(new Error(`Authorization denied: ${error}`));
          return;
        }

        if (!code) {
          this._cleanup();
          clearTimeout(timeout);
          popup?.close();
          reject(new Error('No authorization code received.'));
          return;
        }

        this._cleanup();
        clearTimeout(timeout);
        popup?.close();

        try {
          const token = await this._exchangeCode(code, verifier);
          this._storeToken(token);
          resolve(token);
        } catch (e) {
          reject(e);
        }
      };

      window.addEventListener('message', this._messageListener);
    });
  }

  // ─── Token refresh ──────────────────────────────────────────────────────────

  async refreshToken(): Promise<TokenData> {
    const stored = this.getStoredToken();
    if (!stored?.refresh_token) {
      this.clearToken();
      throw new Error('No refresh token available. Please reconnect.');
    }

    const resp = await fetch(TOKEN_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: new URLSearchParams({
        grant_type: 'refresh_token',
        refresh_token: stored.refresh_token,
        client_id: CLIENT_ID,
      }),
    });

    if (!resp.ok) {
      this.clearToken();
      throw new Error(`Token refresh failed (${resp.status}). Please reconnect.`);
    }

    const data = await resp.json();
    const token = this._normalizeToken(data);
    this._storeToken(token);
    return token;
  }

  /**
   * Return a valid access token, refreshing if needed.
   * Throws if refresh fails (caller should show auth prompt).
   */
  async getValidToken(): Promise<string> {
    if (this.isTokenValid()) {
      return this.getStoredToken()!.access_token;
    }
    const refreshed = await this.refreshToken();
    return refreshed.access_token;
  }

  // ─── Private ────────────────────────────────────────────────────────────────

  private async _exchangeCode(code: string, verifier: string): Promise<TokenData> {
    const resp = await fetch(TOKEN_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: new URLSearchParams({
        grant_type: 'authorization_code',
        code,
        code_verifier: verifier,
        client_id: CLIENT_ID,
        redirect_uri: REDIRECT_URI,
      }),
    });

    if (!resp.ok) {
      const body = await resp.text().catch(() => '');
      throw new Error(`Token exchange failed (${resp.status}): ${body}`);
    }

    return this._normalizeToken(await resp.json());
  }

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

  private _storeToken(token: TokenData): void {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(token));
  }

  private _cleanup(): void {
    if (this._messageListener) {
      window.removeEventListener('message', this._messageListener);
      this._messageListener = null;
    }
    this._pendingState = null;
    this._popup = null;
  }
}

/** Singleton OAuth manager — shared across all card instances. */
export const oauthManager = new OAuthManager();
