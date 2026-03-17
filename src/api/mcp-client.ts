/**
 * Minimal MCP (Model Context Protocol) HTTP client for the Parqet MCP server.
 * Uses the streamable HTTP transport (JSON-RPC 2.0 over HTTPS).
 * https://mcp.parqet.com
 */

import { MCP_BASE } from '../const';
import { oauthManager } from '../auth/oauth';
import type {
  UserInfo,
  Portfolio,
  PerformanceResponse,
  ActivitiesResponse,
  ActivityType,
  MCPRequest,
  MCPResponse,
} from '../types';
import type { IntervalValue } from '../const';

export class MCPClient {
  private _reqId = 0;
  private _initialized = false;

  // ─── Transport ──────────────────────────────────────────────────────────────

  private async _send(req: MCPRequest): Promise<MCPResponse> {
    const token = await oauthManager.getValidToken();
    const resp = await fetch(`${MCP_BASE}/mcp`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
        Accept: 'application/json, text/event-stream',
      },
      body: JSON.stringify(req),
    });

    if (!resp.ok) {
      const text = await resp.text().catch(() => '');
      throw new Error(`MCP server error ${resp.status}: ${text}`);
    }

    const contentType = resp.headers.get('content-type') ?? '';
    if (contentType.includes('text/event-stream')) {
      return this._parseSSE(await resp.text());
    }
    return resp.json() as Promise<MCPResponse>;
  }

  private _parseSSE(text: string): MCPResponse {
    for (const line of text.split('\n')) {
      if (line.startsWith('data: ')) {
        try {
          return JSON.parse(line.slice(6)) as MCPResponse;
        } catch {
          // continue scanning
        }
      }
    }
    throw new Error('No valid JSON found in MCP SSE response.');
  }

  private async _initialize(): Promise<void> {
    const token = await oauthManager.getValidToken();
    await fetch(`${MCP_BASE}/mcp`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        jsonrpc: '2.0',
        id: ++this._reqId,
        method: 'initialize',
        params: {
          protocolVersion: '2024-11-05',
          capabilities: {},
          clientInfo: { name: 'parqet-ha-companion', version: '0.1.0' },
        },
      }),
    });
    this._initialized = true;
  }

  // ─── Tool call helper ───────────────────────────────────────────────────────

  private async _callTool<T>(name: string, args: Record<string, unknown> = {}): Promise<T> {
    if (!this._initialized) {
      await this._initialize();
    }

    const req: MCPRequest = {
      jsonrpc: '2.0',
      id: ++this._reqId,
      method: 'tools/call',
      params: { name, arguments: args } as unknown as Record<string, unknown>,
    };

    const res = await this._send(req);

    if (res.error) {
      throw new Error(`MCP tool error (${name}): ${res.error.message}`);
    }
    if (res.result?.isError) {
      throw new Error(`MCP tool returned error for ${name}`);
    }

    const text = res.result?.content?.[0]?.text;
    if (!text) throw new Error(`Empty MCP response for tool ${name}`);

    return JSON.parse(text) as T;
  }

  // ─── Tools ──────────────────────────────────────────────────────────────────

  async getUser(): Promise<UserInfo> {
    return this._callTool<UserInfo>('parqet_get_user');
  }

  async listPortfolios(): Promise<Portfolio[]> {
    const result = await this._callTool<{ items: Portfolio[] }>('parqet_list_portfolios');
    return result.items;
  }

  async getPerformance(
    portfolioIds: string | string[],
    interval?: { type: 'relative'; value: IntervalValue },
  ): Promise<PerformanceResponse> {
    const ids = Array.isArray(portfolioIds) ? portfolioIds : [portfolioIds];
    const result = await this._callTool<PerformanceResponse['performance']>(
      'parqet_get_performance',
      {
        portfolioIds: ids,
        ...(interval ? { intervalType: interval.type, intervalValue: interval.value } : {}),
      },
    );
    // MCP returns the inner performance object directly; wrap it for API compatibility
    return { performance: result };
  }

  async getActivities(
    portfolioId: string,
    options: {
      activityType?: ActivityType | ActivityType[];
      limit?: number;
      cursor?: string | null;
    } = {},
  ): Promise<ActivitiesResponse> {
    return this._callTool<ActivitiesResponse>('parqet_get_activities', {
      portfolioId,
      ...(options.activityType != null ? { activityType: options.activityType } : {}),
      ...(options.limit != null ? { limit: options.limit } : {}),
      ...(options.cursor ? { cursor: options.cursor } : {}),
    });
  }
}

export const mcpClient = new MCPClient();
