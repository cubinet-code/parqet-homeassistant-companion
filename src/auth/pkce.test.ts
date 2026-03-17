import { describe, it, expect } from 'vitest';
import { generateCodeVerifier, generateCodeChallenge, generateState } from './pkce';

const BASE64URL_RE = /^[A-Za-z0-9\-_]+$/;

describe('generateCodeVerifier', () => {
  it('returns a base64url string', async () => {
    const v = await generateCodeVerifier();
    expect(v).toMatch(BASE64URL_RE);
  });

  it('returns 128 characters (96 bytes base64url)', async () => {
    const v = await generateCodeVerifier();
    expect(v).toHaveLength(128);
  });

  it('returns a different value each call', async () => {
    const [a, b] = await Promise.all([generateCodeVerifier(), generateCodeVerifier()]);
    expect(a).not.toBe(b);
  });
});

describe('generateCodeChallenge', () => {
  it('returns a base64url string', async () => {
    const v = await generateCodeVerifier();
    const c = await generateCodeChallenge(v);
    expect(c).toMatch(BASE64URL_RE);
  });

  it('returns a 43-character S256 challenge', async () => {
    const v = await generateCodeVerifier();
    const c = await generateCodeChallenge(v);
    // SHA-256 = 32 bytes → 43 base64url chars (no padding)
    expect(c).toHaveLength(43);
  });

  it('is deterministic for the same verifier', async () => {
    const v = await generateCodeVerifier();
    const [c1, c2] = await Promise.all([generateCodeChallenge(v), generateCodeChallenge(v)]);
    expect(c1).toBe(c2);
  });

  it('produces different challenge for different verifiers', async () => {
    const [v1, v2] = await Promise.all([generateCodeVerifier(), generateCodeVerifier()]);
    const [c1, c2] = await Promise.all([generateCodeChallenge(v1), generateCodeChallenge(v2)]);
    expect(c1).not.toBe(c2);
  });
});

describe('generateState', () => {
  it('returns a base64url string', () => {
    expect(generateState()).toMatch(BASE64URL_RE);
  });

  it('returns a different value each call', () => {
    expect(generateState()).not.toBe(generateState());
  });
});
