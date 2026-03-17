export const CLIENT_ID = '019cf96b-44f0-73c4-81f2-e8827d5c1e65';

export const AUTH_URL = 'https://connect.parqet.com/oauth2/authorize';
export const METADATA_URL = 'https://connect.parqet.com/.well-known/oauth-authorization-server';

// Cloudflare Worker — full CORS proxy for connect.parqet.com.
// Workaround until Parqet adds CORS headers to their API and OAuth server.
const PROXY_BASE = 'https://parqet-token-proxy.oliver-f26.workers.dev';
export const TOKEN_URL = `${PROXY_BASE}/oauth2/token`;
export const CONNECT_API_BASE = PROXY_BASE;
export const MCP_BASE = 'https://mcp.parqet.com';

export const SCOPES = 'portfolio:read portfolio:write';

export const PROD_REDIRECT_URI =
  'https://cubinet-code.github.io/parqet-homeassistant-companion/callback.html';
export const DEV_REDIRECT_URI = 'http://localhost:3000/callback.html';

// Detect dev vs production at runtime
export const REDIRECT_URI =
  typeof window !== 'undefined' && window.location.hostname === 'localhost'
    ? DEV_REDIRECT_URI
    : PROD_REDIRECT_URI;

export const PARQET_ICON_URL = 'https://developer.parqet.com/img/parqet-icon-trans.svg';
export const PARQET_BRAND_COLOR = '#009991';
export const PARQET_BRAND_HOVER = '#5bcec2';

export const INTERVALS = [
  { value: '1d', label: '1D' },
  { value: '1w', label: '1W' },
  { value: 'mtd', label: 'MTD' },
  { value: '1m', label: '1M' },
  { value: '3m', label: '3M' },
  { value: '6m', label: '6M' },
  { value: '1y', label: '1Y' },
  { value: 'ytd', label: 'YTD' },
  { value: '3y', label: '3Y' },
  { value: '5y', label: '5Y' },
  { value: '10y', label: '10Y' },
  { value: 'max', label: 'Max' },
] as const;

export type IntervalValue = (typeof INTERVALS)[number]['value'];
