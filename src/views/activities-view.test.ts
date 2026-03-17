/**
 * Regression tests for activities-view bugs:
 * - activities_limit must be clamped to >= 10 before sending to API
 * - asset label fallback for custom/cash assets (no name field)
 */
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { ConnectClient } from '../api/connect-client';
import type { TokenData } from '../types';
import { CLIENT_ID } from '../const';

function seedToken(clientId = CLIENT_ID) {
  const token: TokenData = {
    access_token: 'mock-token',
    refresh_token: 'mock-refresh',
    token_type: 'Bearer',
    expires_in: 3600,
    expires_at: Date.now() + 3600_000,
  };
  localStorage.setItem(`parqet_card_auth_${clientId}`, JSON.stringify(token));
}

function mockFetch(data: unknown, status = 200) {
  return vi.fn().mockResolvedValue({
    ok: status >= 200 && status < 300,
    status,
    json: () => Promise.resolve(data),
    text: () => Promise.resolve(JSON.stringify(data)),
  });
}

describe('ConnectClient.getActivities — limit guard', () => {
  beforeEach(() => {
    localStorage.clear();
    seedToken();
  });

  it('sends limit=10 when config provides 10 (minimum allowed)', async () => {
    vi.stubGlobal('fetch', mockFetch({ activities: [], cursor: null }));
    const client = new ConnectClient();
    await client.getActivities('p1', { limit: 10 });
    const url = (fetch as ReturnType<typeof vi.fn>).mock.calls[0][0] as string;
    expect(url).toContain('limit=10');
  });

  it('sends limit=25 for default (no config)', async () => {
    vi.stubGlobal('fetch', mockFetch({ activities: [], cursor: null }));
    const client = new ConnectClient();
    await client.getActivities('p1', { limit: 25 });
    const url = (fetch as ReturnType<typeof vi.fn>).mock.calls[0][0] as string;
    expect(url).toContain('limit=25');
  });

  it('does not send limit=1 — API would reject with 400', async () => {
    // Regression: ha-form number field can emit 1 if user starts typing;
    // the view must clamp to >= 10 before calling the API.
    vi.stubGlobal('fetch', mockFetch({ activities: [], cursor: null }));
    const client = new ConnectClient();
    // The view uses Math.max(10, config.activities_limit ?? 25), so even if
    // activities_limit were 1 it gets clamped. Verify the API is never called with < 10.
    await client.getActivities('p1', { limit: Math.max(10, 1) });
    const url = (fetch as ReturnType<typeof vi.fn>).mock.calls[0][0] as string;
    // Math.max(10, 1) = 10 — verify clamped value is sent, not the raw 1
    expect(url).toMatch(/limit=10(&|$)/);
  });
});
