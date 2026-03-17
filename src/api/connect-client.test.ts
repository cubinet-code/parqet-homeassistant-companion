import { describe, it, expect, vi, beforeEach } from 'vitest';
import { ConnectClient } from './connect-client';
import type { TokenData } from '../types';
import { CLIENT_ID } from '../const';

// Stub a valid token in localStorage so getValidToken() returns immediately
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

describe('ConnectClient.configure', () => {
  it('sets clientId', () => {
    const client = new ConnectClient();
    client.configure('my-id');
    expect(client.clientId).toBe('my-id');
  });

  it('clears clientId when called with undefined', () => {
    const client = new ConnectClient();
    client.configure('my-id');
    client.configure(undefined);
    expect(client.clientId).toBeUndefined();
  });
});

describe('ConnectClient.listPortfolios', () => {
  beforeEach(() => {
    localStorage.clear();
    seedToken();
  });

  it('returns items from /portfolios', async () => {
    const items = [{ id: 'p1', name: 'My Portfolio', currency: 'EUR', createdAt: '', distinctBrokers: [] }];
    vi.stubGlobal('fetch', mockFetch({ items }));

    const client = new ConnectClient();
    const result = await client.listPortfolios();

    expect(result).toEqual(items);
    expect(fetch).toHaveBeenCalledWith(
      expect.stringContaining('/portfolios'),
      expect.objectContaining({ headers: expect.objectContaining({ Authorization: 'Bearer mock-token' }) }),
    );
  });

  it('throws on non-ok response', async () => {
    vi.stubGlobal('fetch', mockFetch({ error: 'Unauthorized' }, 401));
    const client = new ConnectClient();
    await expect(client.listPortfolios()).rejects.toThrow('401');
  });
});

describe('ConnectClient.getPerformance', () => {
  beforeEach(() => {
    localStorage.clear();
    seedToken();
  });

  it('POSTs to /performance with correct body', async () => {
    const perf = { performance: { kpis: null, holdings: [], valuation: { atIntervalEnd: 1000, currency: 'EUR' } } };
    vi.stubGlobal('fetch', mockFetch(perf));

    const client = new ConnectClient();
    await client.getPerformance('p1', { type: 'relative', value: '1y' });

    expect(fetch).toHaveBeenCalledWith(
      expect.stringContaining('/performance'),
      expect.objectContaining({
        method: 'POST',
        body: JSON.stringify({ portfolioIds: ['p1'], interval: { type: 'relative', value: '1y' } }),
      }),
    );
  });

  it('wraps single portfolioId in array', async () => {
    vi.stubGlobal('fetch', mockFetch({ performance: {} }));
    const client = new ConnectClient();
    await client.getPerformance('p1');
    const body = JSON.parse((fetch as ReturnType<typeof vi.fn>).mock.calls[0][1].body);
    expect(body.portfolioIds).toEqual(['p1']);
  });
});

describe('ConnectClient.getActivities', () => {
  beforeEach(() => {
    localStorage.clear();
    seedToken();
  });

  it('builds query string from options', async () => {
    vi.stubGlobal('fetch', mockFetch({ activities: [], cursor: null }));
    const client = new ConnectClient();
    await client.getActivities('p1', { activityType: 'buy', limit: 10 });

    const url = (fetch as ReturnType<typeof vi.fn>).mock.calls[0][0] as string;
    expect(url).toContain('activityType=buy');
    expect(url).toContain('limit=10');
  });

  it('supports multiple activityType values', async () => {
    vi.stubGlobal('fetch', mockFetch({ activities: [], cursor: null }));
    const client = new ConnectClient();
    await client.getActivities('p1', { activityType: ['buy', 'sell'] });

    const url = (fetch as ReturnType<typeof vi.fn>).mock.calls[0][0] as string;
    expect(url).toContain('activityType=buy');
    expect(url).toContain('activityType=sell');
  });
});
