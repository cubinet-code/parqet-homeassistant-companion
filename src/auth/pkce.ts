/**
 * PKCE (Proof Key for Code Exchange) helpers.
 * Uses the Web Crypto API — no external dependencies.
 */

function base64UrlEncode(buffer: Uint8Array): string {
  return btoa(String.fromCharCode(...buffer))
    .replace(/\+/g, '-')
    .replace(/\//g, '_')
    .replace(/=/g, '');
}

/** Generate a cryptographically random code verifier (128 base64url chars). */
export async function generateCodeVerifier(): Promise<string> {
  const array = new Uint8Array(96); // 96 bytes → 128 base64url chars
  crypto.getRandomValues(array);
  return base64UrlEncode(array);
}

/** Derive the S256 code challenge from a verifier. */
export async function generateCodeChallenge(verifier: string): Promise<string> {
  const encoder = new TextEncoder();
  const data = encoder.encode(verifier);
  const digest = await crypto.subtle.digest('SHA-256', data);
  return base64UrlEncode(new Uint8Array(digest));
}

/** Generate a random state string for CSRF protection. */
export function generateState(): string {
  const array = new Uint8Array(16);
  crypto.getRandomValues(array);
  return base64UrlEncode(array);
}
