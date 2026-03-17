import { CONNECT_API_BASE } from '../const';
import { oauthManager } from '../auth/oauth';
import type {
  UserInfo,
  Portfolio,
  PortfolioListResponse,
  PerformanceBody,
  PerformanceResponse,
  ActivitiesResponse,
  ActivityType,
  AssetType,
  RelativeInterval,
} from '../types';
import type { IntervalValue } from '../const';

export class ConnectClient {
  clientId?: string;

  configure(clientId?: string): void {
    this.clientId = clientId;
  }

  private async _get<T>(path: string): Promise<T> {
    const token = await oauthManager.getValidToken(this.clientId);
    const resp = await fetch(`${CONNECT_API_BASE}${path}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    if (!resp.ok) {
      const body = await resp.text().catch(() => '');
      throw new Error(`Parqet API error ${resp.status} at ${path}: ${body}`);
    }
    return resp.json() as Promise<T>;
  }

  private async _post<T>(path: string, body: unknown): Promise<T> {
    const token = await oauthManager.getValidToken(this.clientId);
    const resp = await fetch(`${CONNECT_API_BASE}${path}`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    });
    if (!resp.ok) {
      const text = await resp.text().catch(() => '');
      throw new Error(`Parqet API error ${resp.status} at ${path}: ${text}`);
    }
    return resp.json() as Promise<T>;
  }

  // ─── Endpoints ──────────────────────────────────────────────────────────────

  async getUser(): Promise<UserInfo> {
    return this._get<UserInfo>('/user');
  }

  async listPortfolios(): Promise<Portfolio[]> {
    const data = await this._get<PortfolioListResponse>('/portfolios');
    return data.items;
  }

  /**
   * POST /performance
   * Fetches performance data for one or more portfolio IDs.
   */
  async getPerformance(
    portfolioIds: string | string[],
    interval?: RelativeInterval | { type: 'relative'; value: IntervalValue },
  ): Promise<PerformanceResponse> {
    const ids = Array.isArray(portfolioIds) ? portfolioIds : [portfolioIds];
    const body: PerformanceBody = {
      portfolioIds: ids,
      interval: interval ?? { type: 'relative', value: 'max' },
    };
    return this._post<PerformanceResponse>('/performance', body);
  }

  /**
   * GET /portfolios/{portfolioId}/activities
   */
  async getActivities(
    portfolioId: string,
    options: {
      activityType?: ActivityType | ActivityType[];
      assetType?: AssetType | AssetType[];
      holdingId?: string | string[];
      limit?: number;
      cursor?: string | null;
    } = {},
  ): Promise<ActivitiesResponse> {
    const params = new URLSearchParams();

    if (options.activityType) {
      const types = Array.isArray(options.activityType)
        ? options.activityType
        : [options.activityType];
      types.forEach((t) => params.append('activityType', t));
    }
    if (options.assetType) {
      const types = Array.isArray(options.assetType) ? options.assetType : [options.assetType];
      types.forEach((t) => params.append('assetType', t));
    }
    if (options.holdingId) {
      const ids = Array.isArray(options.holdingId) ? options.holdingId : [options.holdingId];
      ids.forEach((id) => params.append('holdingId', id));
    }
    if (options.limit != null) params.set('limit', String(options.limit));
    if (options.cursor) params.set('cursor', options.cursor);

    const qs = params.toString();
    return this._get<ActivitiesResponse>(
      `/portfolios/${portfolioId}/activities${qs ? `?${qs}` : ''}`,
    );
  }
}

export const connectClient = new ConnectClient();
