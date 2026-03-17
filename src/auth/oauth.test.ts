import { describe, it, expect, beforeEach } from 'vitest';
import { OAuthManager } from './oauth';
import { CLIENT_ID } from '../const';
import type { TokenData } from '../types';

function makeToken(expiresInMs: number): TokenData {
  return {
    access_token: 'test-access-token',
    refresh_token: 'test-refresh-token',
    token_type: 'Bearer',
    expires_in: expiresInMs / 1000,
    expires_at: Date.now() + expiresInMs,
  };
}

describe('OAuthManager — token storage', () => {
  let mgr: OAuthManager;

  beforeEach(() => {
    localStorage.clear();
    mgr = new OAuthManager();
  });

  it('returns null when nothing is stored', () => {
    expect(mgr.getStoredToken()).toBeNull();
  });

  it('stores and retrieves a token (default client)', () => {
    const token = makeToken(3600_000);
    localStorage.setItem(`parqet_card_auth_${CLIENT_ID}`, JSON.stringify(token));
    expect(mgr.getStoredToken()).toEqual(token);
  });

  it('stores and retrieves a token under a custom client ID', () => {
    const token = makeToken(3600_000);
    localStorage.setItem('parqet_card_auth_my-custom-id', JSON.stringify(token));
    expect(mgr.getStoredToken('my-custom-id')).toEqual(token);
    // Default key is separate
    expect(mgr.getStoredToken()).toBeNull();
  });

  it('clearToken removes only the correct key', () => {
    const token = makeToken(3600_000);
    localStorage.setItem(`parqet_card_auth_${CLIENT_ID}`, JSON.stringify(token));
    localStorage.setItem('parqet_card_auth_other', JSON.stringify(token));

    mgr.clearToken();

    expect(mgr.getStoredToken()).toBeNull();
    expect(localStorage.getItem('parqet_card_auth_other')).not.toBeNull();
  });
});

describe('OAuthManager — isTokenValid', () => {
  let mgr: OAuthManager;

  beforeEach(() => {
    localStorage.clear();
    mgr = new OAuthManager();
  });

  it('returns false when no token is stored', () => {
    expect(mgr.isTokenValid()).toBe(false);
  });

  it('returns true for a token that expires far in the future', () => {
    const token = makeToken(3600_000); // 1 hour
    localStorage.setItem(`parqet_card_auth_${CLIENT_ID}`, JSON.stringify(token));
    expect(mgr.isTokenValid()).toBe(true);
  });

  it('returns false for an already-expired token', () => {
    const token = makeToken(-1000); // expired 1 second ago
    localStorage.setItem(`parqet_card_auth_${CLIENT_ID}`, JSON.stringify(token));
    expect(mgr.isTokenValid()).toBe(false);
  });

  it('returns false when token expires within the refresh buffer (60s)', () => {
    const token = makeToken(30_000); // expires in 30s — inside 60s buffer
    localStorage.setItem(`parqet_card_auth_${CLIENT_ID}`, JSON.stringify(token));
    expect(mgr.isTokenValid()).toBe(false);
  });

  it('uses custom clientId for key lookup', () => {
    const token = makeToken(3600_000);
    localStorage.setItem('parqet_card_auth_custom', JSON.stringify(token));
    expect(mgr.isTokenValid('custom')).toBe(true);
    expect(mgr.isTokenValid()).toBe(false);
  });
});
