import type { IntervalValue } from './const';

// ─── OAuth ────────────────────────────────────────────────────────────────────

export interface TokenData {
  access_token: string;
  refresh_token?: string;
  token_type: string;
  expires_in: number;
  /** Computed: Date.now() + expires_in * 1000 */
  expires_at: number;
}

// ─── Parqet Connect API ───────────────────────────────────────────────────────

export interface UserInfo {
  userId: string;
  installationId: string;
  state: 'active' | 'deleted';
  permissions: Permission[];
}

export interface Permission {
  action: 'read' | 'write';
  resourceType: 'portfolio';
  resourceId: string;
}

export interface Portfolio {
  id: string;
  name: string;
  currency: string;
  createdAt: string;
  distinctBrokers: string[];
}

export interface PortfolioListResponse {
  items: Portfolio[];
}

// ─── Performance ─────────────────────────────────────────────────────────────

export interface PerformanceBody {
  portfolioIds: string[];
  interval?: RelativeInterval | AbsoluteInterval;
}

export interface RelativeInterval {
  type: 'relative';
  value: IntervalValue;
}

export interface AbsoluteInterval {
  type: 'absolute';
  start: string;
  end?: string;
}

export interface PerformanceResponse {
  performance: PortfolioPerformance;
  holdings: Holding[];   // top-level, NOT nested inside performance
}

export interface PortfolioPerformance {
  kpis: PortfolioKpis | null;
  fees: { inInterval: { fees: number } };
  taxes: { inInterval: { taxes: number } };
  unrealizedGains: {
    inInterval: {
      gainGross: number;
      gainNet: number;
      returnGross: number;
      returnNet: number;
    };
  };
  realizedGains: {
    inInterval: {
      gainGross: number;
      gainNet: number;
    };
  };
  dividends: {
    inInterval: {
      gainGross: number;
      gainNet: number;
    };
  } | null;
  valuation: {
    atIntervalStart: number;
    atIntervalEnd: number;
  };
}

export interface PortfolioKpis {
  inInterval: {
    xirr: number | null;
    ttwror: number | null;
  };
}

export interface Holding {
  id: string;
  nickname: string | null;
  logo: string | null;
  asset: Asset;
  position: Position;
  performance: HoldingPerformance;
  quote?: Quote;
  startQuote?: Quote;
  activityCount: number;
  earliestActivityDate: string;
}

export interface HoldingPerformance {
  kpis: HoldingKpis | null;
  fees: { inInterval: { fees: number } };
  taxes: { inInterval: { taxes: number } };
  unrealizedGains: {
    inInterval: { gainGross: number; gainNet: number; returnGross: number; returnNet: number };
  };
  realizedGains: {
    inInterval: { gainGross: number; gainNet: number; returnGross: number; returnNet: number };
  };
  dividends: {
    inInterval: { gainGross: number; gainNet: number; taxes: number; fees: number };
  } | null;
  valuation: { atIntervalStart: number; atIntervalEnd: number };
}

export interface Asset {
  name: string;
  type: AssetType;
  assetIdentifierType?: 'isin' | 'ticker' | 'custom';
  isin?: string;
  symbol?: string;
}

export type AssetType = 'cash' | 'security' | 'crypto' | 'commodity' | 'custom' | 'real_estate';

export interface Position {
  shares: number;
  purchasePrice: number;
  purchaseValue: number;
  currentPrice: number;
  currentValue: number;
  isSold: boolean;
}

export interface HoldingKpis {
  inInterval: {
    xirr: number | null;
    ttwror: number | null;
  };
}

export interface Quote {
  price: number;
  currency: string;
  exchange: string;
  datetime: string;
  fx?: number;
}

// ─── Activities ───────────────────────────────────────────────────────────────

export type ActivityType =
  | 'buy'
  | 'sell'
  | 'dividend'
  | 'interest'
  | 'transfer_in'
  | 'transfer_out'
  | 'fees_taxes'
  | 'deposit'
  | 'withdrawal';

export interface ActivitiesResponse {
  activities: Activity[];
  cursor: string | null;
}

export interface Activity {
  id: string;
  type: ActivityType;
  holdingId: string;
  holdingAssetType: AssetType;
  asset: Asset & { assetIdentifierType: string };
  shares?: number;
  price?: number;
  amount: number;
  amountNet?: number;
  currency: string;
  datetime: string;
  tax?: number;
  fee?: number;
  broker?: string;
  description?: string;
  realizedGains?: number;
  realizedGainsNet?: number;
  avgHoldingPeriod?: number;
  buyAmountNet?: number;
}

// ─── Card Config ──────────────────────────────────────────────────────────────

export type ViewType = 'performance' | 'holdings' | 'activities';
export type DataSource = 'rest' | 'mcp';
export type ViewLayout = 'tabs' | 'single';
export type KpiMetric =
  | 'total_value'
  | 'period_return'
  | 'xirr'
  | 'ttwror'
  | 'unrealized_gain'
  | 'realized_gain'
  | 'dividends'
  | 'fees'
  | 'taxes';

export type ChartType = 'allocation_donut' | 'holdings_pl_bar' | 'performance_breakdown';

export interface ParqetCardConfig {
  type: string;
  data_source?: DataSource;
  portfolio_id?: string;
  view_layout?: ViewLayout;
  default_view?: ViewType;
  default_interval?: IntervalValue;
  show_interval_selector?: boolean;
  show_chart?: boolean;
  chart_type?: ChartType;
  activities_limit?: number;
  default_activity_type?: ActivityType | null;
  currency_symbol?: string;
  show_logo?: boolean;
  compact?: boolean;
  hide_header?: boolean;
  /** Override the shared Parqet Connect Client ID with your own app registration. */
  client_id?: string;
  /** Override the OAuth redirect URI (required when using a custom client_id). */
  redirect_uri?: string;
  /** Auto-refresh interval in minutes (0 = disabled, minimum 1). */
  refresh_interval?: number;
}

export type KpiLayout = 'vertical' | 'horizontal';

export interface KpiCardConfig {
  type: string;
  data_source?: DataSource;
  portfolio_id?: string;
  kpi?: KpiMetric;
  secondary_kpis?: KpiMetric[];
  /** @deprecated Use secondary_kpis. Kept for backward-compatible migration. */
  secondary_kpi?: KpiMetric | null;
  layout?: KpiLayout;
  default_interval?: IntervalValue;
  show_interval_selector?: boolean;
  show_sparkline?: boolean;
  currency_symbol?: string;
  client_id?: string;
  redirect_uri?: string;
  /** Auto-refresh interval in minutes (0 = disabled, minimum 1). */
  refresh_interval?: number;
}

// ─── MCP ─────────────────────────────────────────────────────────────────────

export interface MCPRequest {
  jsonrpc: '2.0';
  id: number;
  method: string;
  params?: Record<string, unknown>;
}

export interface MCPResponse {
  jsonrpc: '2.0';
  id: number;
  result?: {
    content: Array<{ type: 'text'; text: string }>;
    isError?: boolean;
  };
  error?: { code: number; message: string };
}
