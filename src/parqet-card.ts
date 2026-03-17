/**
 * Parqet Home Assistant Companion
 * A HACS-publishable Lovelace custom card for Parqet portfolio data.
 *
 * Repo: https://github.com/cubinet-code/parqet-homeassistant-companion
 */

import { LitElement, html, css, PropertyValues } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';

import { oauthManager } from './auth/oauth';
import { connectClient } from './api/connect-client';
import { mcpClient } from './api/mcp-client';

import type { ParqetCardConfig, Portfolio, ViewType } from './types';

import './components/auth-prompt';
import './components/portfolio-selector';
import './components/loading-spinner';
import './views/performance-view';
import './views/holdings-view';
import './views/activities-view';

// ─── Card registration ────────────────────────────────────────────────────────

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const w = window as any;
w['customCards'] = w['customCards'] || [];
w['customCards'].push({
  type: 'parqet-companion-card',
  name: 'Parqet Home Assistant Companion',
  description: 'Display your Parqet portfolio data — performance, holdings and activities.',
  preview: true,
  documentationURL: 'https://github.com/cubinet-code/parqet-homeassistant-companion',
});

// ─── Card element ─────────────────────────────────────────────────────────────

@customElement('parqet-companion-card')
export class ParqetCompanionCard extends LitElement {
  // HA sets this on every state change
  @property({ attribute: false }) hass!: Record<string, unknown>;

  @state() private _config!: ParqetCardConfig;
  @state() private _authenticated = false;
  @state() private _portfolios: Portfolio[] = [];
  @state() private _portfolioId: string | null = null;
  @state() private _activeView: ViewType = 'performance';
  @state() private _loading = false;
  @state() private _authLoading = false;
  @state() private _error = '';

  // ─── Lifecycle ────────────────────────────────────────────────────────────

  connectedCallback() {
    super.connectedCallback();
    this._authenticated = oauthManager.isTokenValid(this._config?.client_id);
    if (this._authenticated) {
      void this._loadPortfolios();
    }
  }

  updated(changed: PropertyValues) {
    // Re-check token validity when HA sends new hass state
    if (changed.has('hass') && !this._authenticated) {
      if (oauthManager.isTokenValid(this._config?.client_id)) {
        this._authenticated = true;
        void this._loadPortfolios();
      }
    }
  }

  // ─── HA card API ──────────────────────────────────────────────────────────

  setConfig(config: ParqetCardConfig): void {
    this._config = {
      data_source: 'rest',
      view_layout: 'tabs',
      default_view: 'performance',
      default_interval: '1y',
      show_chart: true,
      show_logo: true,
      compact: false,
      currency_symbol: '€',
      activities_limit: 25,
      ...config,
    };
    this._activeView = this._config.default_view!;
    // Propagate client_id override to API clients so they use the correct token
    connectClient.configure(this._config.client_id);
    mcpClient.configure(this._config.client_id);
  }

  getCardSize(): number {
    return 6;
  }

  getGridOptions() {
    return { columns: 12, rows: 6, min_columns: 6, min_rows: 4 };
  }

  static getStubConfig(): Partial<ParqetCardConfig> {
    return {
      data_source: 'rest',
      default_view: 'performance',
      default_interval: '1y',
      show_chart: true,
      show_logo: true,
      compact: false,
      currency_symbol: '€',
    };
  }

  static getConfigForm() {
    return [
      {
        name: 'data_source',
        label: 'Data Source',
        selector: {
          select: {
            options: [
              { value: 'rest', label: 'Connect REST API (recommended)' },
              { value: 'mcp', label: 'MCP Server (mcp.parqet.com)' },
            ],
          },
        },
      },
      {
        name: 'portfolio_id',
        label: 'Portfolio ID (leave empty to show picker)',
        selector: { text: {} },
      },
      {
        name: 'default_view',
        label: 'Default View',
        selector: {
          select: {
            options: [
              { value: 'performance', label: 'Performance' },
              { value: 'holdings', label: 'Holdings' },
              { value: 'activities', label: 'Activities' },
            ],
          },
        },
      },
      {
        name: 'view_layout',
        label: 'View Layout',
        selector: {
          select: {
            options: [
              { value: 'tabs', label: 'Tabs (all views)' },
              { value: 'single', label: 'Single view only' },
            ],
          },
        },
      },
      {
        name: 'default_interval',
        label: 'Default Time Interval',
        selector: {
          select: {
            options: [
              { value: '1d', label: '1 Day' },
              { value: '1w', label: '1 Week' },
              { value: '1m', label: '1 Month' },
              { value: '3m', label: '3 Months' },
              { value: '6m', label: '6 Months' },
              { value: '1y', label: '1 Year' },
              { value: 'ytd', label: 'Year to Date' },
              { value: '3y', label: '3 Years' },
              { value: '5y', label: '5 Years' },
              { value: 'max', label: 'All Time' },
            ],
          },
        },
      },
      { name: 'currency_symbol', label: 'Currency Symbol', selector: { text: {} } },
      { name: 'show_logo', label: 'Show holding logos', selector: { boolean: {} } },
      { name: 'compact', label: 'Compact mode', selector: { boolean: {} } },
      {
        name: 'activities_limit',
        label: 'Activities per page (10–500)',
        selector: { number: { min: 10, max: 500, step: 10, mode: 'box' } },
      },
      {
        name: 'client_id',
        label: 'Parqet Connect Client ID (optional — leave blank to use shared default)',
        selector: { text: {} },
      },
      {
        name: 'redirect_uri',
        label: 'OAuth Redirect URI (optional — required when using your own Client ID)',
        selector: { text: {} },
      },
    ];
  }

  // ─── Data loading ──────────────────────────────────────────────────────────

  private get _client() {
    return this._config?.data_source === 'mcp' ? mcpClient : connectClient;
  }

  private async _loadPortfolios() {
    this._loading = true;
    this._error = '';
    try {
      this._portfolios = await this._client.listPortfolios();
      this._portfolioId =
        this._config?.portfolio_id ?? this._portfolios[0]?.id ?? null;
    } catch (e) {
      this._error = e instanceof Error ? e.message : String(e);
      // If we got a 401, invalidate the token
      if (String(e).includes('401')) {
        oauthManager.clearToken(this._config?.client_id);
        this._authenticated = false;
      }
    } finally {
      this._loading = false;
    }
  }

  // ─── Event handlers ────────────────────────────────────────────────────────

  private async _handleConnect() {
    this._authLoading = true;
    this._error = '';
    try {
      await oauthManager.startAuth(this._config?.client_id, this._config?.redirect_uri);
      this._authenticated = true;
      await this._loadPortfolios();
    } catch (e) {
      this._error = e instanceof Error ? e.message : String(e);
    } finally {
      this._authLoading = false;
    }
  }

  private _handleDisconnect() {
    oauthManager.clearToken(this._config?.client_id);
    this._authenticated = false;
    this._portfolios = [];
    this._portfolioId = null;
    this._error = '';
  }

  private _handlePortfolioChange(e: CustomEvent) {
    this._portfolioId = e.detail.portfolioId as string;
  }

  // ─── Render ────────────────────────────────────────────────────────────────

  render() {
    // Not authenticated → show connect screen
    if (!this._authenticated) {
      return html`
        <ha-card>
          <parqet-auth-prompt
            .loading=${this._authLoading}
            .error=${this._error}
            @connect=${this._handleConnect}
          ></parqet-auth-prompt>
        </ha-card>
      `;
    }

    // Loading portfolios
    if (this._loading && this._portfolios.length === 0) {
      return html`
        <ha-card>
          <parqet-loading-spinner></parqet-loading-spinner>
        </ha-card>
      `;
    }

    const showTabs = this._config?.view_layout !== 'single';
    const views: ViewType[] = ['performance', 'holdings', 'activities'];

    return html`
      <ha-card>
        <!-- Header row -->
        <div class="card-header">
          ${this._portfolios.length > 1
            ? html`
                <parqet-portfolio-selector
                  .portfolios=${this._portfolios}
                  .selected=${this._portfolioId}
                  @portfolio-change=${this._handlePortfolioChange}
                ></parqet-portfolio-selector>
              `
            : html`<span class="portfolio-name">${this._portfolios[0]?.name ?? ''}</span>`}

          <button
            class="disconnect-btn"
            @click=${this._handleDisconnect}
            title="Disconnect Parqet account"
            aria-label="Disconnect Parqet account"
          >
            ⏏
          </button>
        </div>

        <!-- Tabs -->
        ${showTabs
          ? html`
              <div class="tabs" role="tablist">
                ${views.map(
                  (v) => html`
                    <button
                      class="tab ${this._activeView === v ? 'active' : ''}"
                      role="tab"
                      aria-selected=${this._activeView === v}
                      @click=${() => (this._activeView = v)}
                    >
                      ${v.charAt(0).toUpperCase() + v.slice(1)}
                    </button>
                  `,
                )}
              </div>
            `
          : ''}

        ${this._error ? html`<div class="card-error">${this._error}</div>` : ''}

        <!-- View content -->
        <div class="view-content" role="tabpanel">
          ${this._portfolioId ? this._renderView() : html`<div class="empty">No portfolio selected.</div>`}
        </div>
      </ha-card>
    `;
  }

  private _renderView() {
    const id = this._portfolioId!;
    const view = this._activeView;

    if (view === 'performance') {
      return html`
        <parqet-performance-view
          .portfolioId=${id}
          .client=${this._client}
          .config=${this._config}
        ></parqet-performance-view>
      `;
    }
    if (view === 'holdings') {
      return html`
        <parqet-holdings-view
          .portfolioId=${id}
          .client=${this._client}
          .config=${this._config}
        ></parqet-holdings-view>
      `;
    }
    return html`
      <parqet-activities-view
        .portfolioId=${id}
        .client=${this._client}
        .config=${this._config}
      ></parqet-activities-view>
    `;
  }

  // ─── Styles ────────────────────────────────────────────────────────────────

  static styles = css`
    :host {
      display: block;
    }
    ha-card {
      overflow: hidden;
    }
    .card-header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 12px 16px;
      border-bottom: 1px solid var(--divider-color, #e0e0e0);
      min-height: 48px;
    }
    .portfolio-name {
      font-weight: 600;
      font-size: 1rem;
      color: var(--primary-text-color);
    }
    .disconnect-btn {
      background: none;
      border: none;
      cursor: pointer;
      color: var(--secondary-text-color);
      padding: 4px 6px;
      border-radius: 4px;
      opacity: 0.5;
      font-size: 1rem;
      line-height: 1;
      transition: opacity 0.15s;
    }
    .disconnect-btn:hover {
      opacity: 1;
    }
    .disconnect-btn:focus-visible {
      outline: 2px solid var(--primary-color);
      outline-offset: 1px;
    }
    .tabs {
      display: flex;
      border-bottom: 1px solid var(--divider-color, #e0e0e0);
    }
    .tab {
      flex: 1;
      padding: 10px 4px;
      background: none;
      border: none;
      border-bottom: 2px solid transparent;
      cursor: pointer;
      color: var(--secondary-text-color);
      font-size: 0.875rem;
      font-weight: 500;
      transition: color 0.15s, border-color 0.15s;
    }
    .tab.active {
      color: var(--primary-color, #03a9f4);
      border-bottom-color: var(--primary-color, #03a9f4);
    }
    .tab:hover:not(.active) {
      color: var(--primary-text-color);
    }
    .tab:focus-visible {
      outline: 2px solid var(--primary-color);
      outline-offset: -2px;
    }
    .card-error {
      margin: 8px 16px;
      padding: 8px 12px;
      background: rgba(244, 67, 54, 0.1);
      color: var(--error-color, #f44336);
      border-radius: 6px;
      font-size: 0.82rem;
    }
    .view-content {
      overflow: hidden;
    }
    .empty {
      padding: 32px;
      text-align: center;
      color: var(--secondary-text-color);
      font-size: 0.875rem;
    }
  `;
}

declare global {
  interface HTMLElementTagNameMap {
    'parqet-companion-card': ParqetCompanionCard;
  }
}
