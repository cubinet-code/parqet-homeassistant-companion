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

import './components/portfolio-selector';
import './components/loading-spinner';
import './views/performance-view';
import './views/holdings-view';
import './views/activities-view';
import './cards/kpi-card';

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
w['customCards'].push({
  type: 'parqet-kpi-card',
  name: 'Parqet KPI Card',
  description: 'Show a single Parqet portfolio metric — total value, XIRR, returns, dividends and more.',
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
  @state() private _error = '';
  @state() private _refreshTrigger = 0;
  private _refreshTimer: ReturnType<typeof setInterval> | null = null;

  // ─── Lifecycle ────────────────────────────────────────────────────────────

  connectedCallback() {
    super.connectedCallback();
    this._authenticated = oauthManager.isTokenValid(this._config?.client_id);
    if (this._authenticated) {
      void this._loadPortfolios();
    }
    this._setupRefreshTimer();
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    this._clearRefreshTimer();
  }

  updated(changed: PropertyValues) {
    // Re-check token validity when HA sends new hass state
    if (changed.has('hass') && !this._authenticated) {
      if (oauthManager.isTokenValid(this._config?.client_id)) {
        this._authenticated = true;
        void this._loadPortfolios();
        this._setupRefreshTimer();
      }
    }
  }

  private _setupRefreshTimer() {
    this._clearRefreshTimer();
    const minutes = this._config?.refresh_interval;
    if (minutes && minutes >= 1) {
      this._refreshTimer = setInterval(() => {
        this._refreshTrigger++;
      }, minutes * 60_000);
    }
  }

  private _clearRefreshTimer() {
    if (this._refreshTimer !== null) {
      clearInterval(this._refreshTimer);
      this._refreshTimer = null;
    }
  }

  // ─── HA card API ──────────────────────────────────────────────────────────

  setConfig(config: ParqetCardConfig): void {
    this._config = {
      data_source: 'rest',
      view_layout: 'tabs',
      default_view: 'performance',
      default_interval: '1y',
      show_interval_selector: true,
      show_chart: true,
      show_logo: true,
      compact: false,
      currency_symbol: '€',
      activities_limit: 25,
      refresh_interval: 0,
      ...config,
    };
    this._activeView = this._config.default_view!;
    // Propagate client_id override to API clients so they use the correct token
    connectClient.configure(this._config.client_id);
    mcpClient.configure(this._config.client_id);
    this._setupRefreshTimer();
  }

  getCardSize(): number {
    return 6;
  }

  getGridOptions() {
    return { columns: 12, rows: 6, min_columns: 6, min_rows: 4 };
  }

  static getConfigElement(): HTMLElement {
    return document.createElement('parqet-companion-card-editor');
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
      // portfolio_id is handled dynamically in the editor render (portfolio picker dropdown)
      {
        name: 'data_source',
        label: 'Data Source',
        selector: {
          select: {
            options: [
              { value: 'rest', label: 'Connect REST API (recommended)' },
              { value: 'mcp', label: 'MCP Server — unavailable (Parqet API limitation)', disabled: true },
            ],
          },
        },
      },
      {
        type: 'expandable',
        title: 'Layout',
        flatten: true,
        schema: [
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
          { name: 'compact', label: 'Compact mode', selector: { boolean: {} } },
          { name: 'hide_header', label: 'Hide portfolio header (useful when portfolio is locked)', selector: { boolean: {} } },
        ],
      },
      {
        type: 'expandable',
        title: 'Performance',
        flatten: true,
        schema: [
          { name: 'show_chart', label: 'Show charts', selector: { boolean: {} } },
          { name: 'show_interval_selector', label: 'Show interval selector on card', selector: { boolean: {} } },
          {
            name: 'default_interval',
            label: 'Default Time Interval',
            selector: {
              select: {
                options: [
                  { value: '1d', label: '1 Day' },
                  { value: '1w', label: '1 Week' },
                  { value: 'mtd', label: 'Month to Date' },
                  { value: '1m', label: '1 Month' },
                  { value: '3m', label: '3 Months' },
                  { value: '6m', label: '6 Months' },
                  { value: '1y', label: '1 Year' },
                  { value: 'ytd', label: 'Year to Date' },
                  { value: '3y', label: '3 Years' },
                  { value: '5y', label: '5 Years' },
                  { value: '10y', label: '10 Years' },
                  { value: 'max', label: 'All Time' },
                ],
              },
            },
          },
        ],
      },
      {
        type: 'expandable',
        title: 'Holdings',
        flatten: true,
        schema: [
          { name: 'show_logo', label: 'Show holding logos', selector: { boolean: {} } },
        ],
      },
      {
        type: 'expandable',
        title: 'Activities',
        flatten: true,
        schema: [
          {
            name: 'activities_limit',
            label: 'Activities to show (1–25)',
            selector: { number: { min: 1, max: 25, step: 1, mode: 'box' } },
          },
          {
            name: 'default_activity_type',
            label: 'Default activity filter',
            selector: {
              select: {
                options: [
                  { value: 'all', label: 'All' },
                  { value: 'buy', label: 'Buy' },
                  { value: 'sell', label: 'Sell' },
                  { value: 'dividend', label: 'Dividend' },
                  { value: 'interest', label: 'Interest' },
                  { value: 'transfer_in', label: 'Transfer In' },
                  { value: 'transfer_out', label: 'Transfer Out' },
                  { value: 'fees_taxes', label: 'Fees / Taxes' },
                  { value: 'deposit', label: 'Deposit' },
                  { value: 'withdrawal', label: 'Withdrawal' },
                ],
              },
            },
          },
        ],
      },
      {
        type: 'expandable',
        title: 'Display',
        flatten: true,
        schema: [
          { name: 'currency_symbol', label: 'Currency Symbol', selector: { text: {} } },
          {
            name: 'refresh_interval',
            label: 'Auto-refresh interval in minutes (0 = disabled)',
            selector: { number: { min: 0, max: 60, step: 1, mode: 'box' } },
          },
        ],
      },
      {
        type: 'expandable',
        title: 'Advanced',
        flatten: true,
        schema: [
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
        ],
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

  private _handlePortfolioChange(e: CustomEvent) {
    this._portfolioId = e.detail.portfolioId as string;
  }

  // ─── Render ────────────────────────────────────────────────────────────────

  render() {
    // Not authenticated → hint user to open the editor
    if (!this._authenticated) {
      return html`
        <ha-card>
          <div class="not-connected">
            <span>Not connected to Parqet</span>
            <span class="hint">Open the card editor to connect</span>
          </div>
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
        <div class="upgrade-banner">
          <strong>Upgrade available!</strong> A full Home Assistant integration with sensors, entities, and automations is now available.
          <a href="https://github.com/cubinet-code/ha-parqet-companion" target="_blank" rel="noopener">Switch to ha-parqet-companion &rarr;</a>
          <span class="upgrade-sub">This card will no longer receive updates.</span>
        </div>

        <!-- Header row -->
        ${!this._config?.hide_header
          ? html`
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
              </div>
            `
          : ''}

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
          .refreshTrigger=${this._refreshTrigger}
        ></parqet-performance-view>
      `;
    }
    if (view === 'holdings') {
      return html`
        <parqet-holdings-view
          .portfolioId=${id}
          .client=${this._client}
          .config=${this._config}
          .refreshTrigger=${this._refreshTrigger}
        ></parqet-holdings-view>
      `;
    }
    return html`
      <parqet-activities-view
        .portfolioId=${id}
        .client=${this._client}
        .config=${this._config}
        .refreshTrigger=${this._refreshTrigger}
      ></parqet-activities-view>
    `;
  }

  // ─── Styles ────────────────────────────────────────────────────────────────

  static styles = css`
    :host {
      display: block;
      overflow: hidden;
      min-width: 0;
      height: 100%;
    }
    ha-card {
      display: flex;
      flex-direction: column;
      overflow: hidden;
      height: 100%;
    }
    .upgrade-banner {
      background: var(--info-color, #039be5);
      color: #fff;
      padding: 10px 14px;
      font-size: 0.8rem;
      line-height: 1.4;
    }
    .upgrade-banner a {
      color: #fff;
      font-weight: 600;
      text-decoration: underline;
    }
    .upgrade-banner .upgrade-sub {
      display: block;
      opacity: 0.85;
      font-size: 0.7rem;
      margin-top: 2px;
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
      flex: 1;
      min-height: 0;
      overflow-y: auto;
    }
    .empty {
      padding: 32px;
      text-align: center;
      color: var(--secondary-text-color);
      font-size: 0.875rem;
    }
    .not-connected {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      gap: 4px;
      padding: 20px;
      font-size: 0.875rem;
      color: var(--secondary-text-color);
    }
    .hint {
      font-size: 0.75rem;
      opacity: 0.7;
    }
  `;
}

declare global {
  interface HTMLElementTagNameMap {
    'parqet-companion-card': ParqetCompanionCard;
    'parqet-companion-card-editor': ParqetCompanionCardEditor;
  }
}

// ─── Visual config editor ──────────────────────────────────────────────────────

@customElement('parqet-companion-card-editor')
class ParqetCompanionCardEditor extends LitElement {
  @property({ attribute: false }) hass!: Record<string, unknown>;
  @state() private _config?: ParqetCardConfig;
  @state() private _connected = false;
  @state() private _authLoading = false;
  @state() private _authError = '';
  @state() private _portfolios: Portfolio[] = [];
  @state() private _loadingPortfolios = false;

  setConfig(config: ParqetCardConfig): void {
    this._config = config;
    this._connected = oauthManager.isTokenValid(config.client_id);
    if (this._connected && this._portfolios.length === 0) {
      void this._fetchPortfolios();
    }
  }

  private async _fetchPortfolios(): Promise<void> {
    this._loadingPortfolios = true;
    try {
      const client = this._config?.data_source === 'mcp' ? mcpClient : connectClient;
      this._portfolios = await client.listPortfolios();
    } catch {
      // silent — user can still clear portfolio_id to use in-card picker
    } finally {
      this._loadingPortfolios = false;
    }
  }

  private async _handleConnect(): Promise<void> {
    this._authLoading = true;
    this._authError = '';
    const popup = window.open('', 'parqet-auth', 'width=520,height=720,scrollbars=yes,resizable=yes');
    try {
      await oauthManager.startAuth(this._config?.client_id, this._config?.redirect_uri, popup);
      this._connected = true;
      void this._fetchPortfolios();
    } catch (e) {
      this._authError = e instanceof Error ? e.message : String(e);
    } finally {
      this._authLoading = false;
    }
  }

  render() {
    if (!this._config || !this.hass) return html``;
    return html`
      <div class="auth-row">
        <div class="auth-status">
          <span class="auth-dot ${this._connected ? 'connected' : 'disconnected'}"></span>
          ${this._connected ? 'Connected to Parqet' : 'Not connected to Parqet'}
        </div>
        ${this._connected
          ? html`<button class="auth-btn disconnect" @click=${this._handleDisconnect}>Disconnect</button>`
          : html`<button class="auth-btn connect" @click=${this._handleConnect} ?disabled=${this._authLoading}>
              ${this._authLoading ? 'Connecting…' : 'Connect'}
            </button>`}
      </div>
      ${this._authError ? html`<div class="auth-error">${this._authError}</div>` : ''}

      <!-- Portfolio picker -->
      <div class="portfolio-row">
        <label class="portfolio-label">Portfolio</label>
        ${this._loadingPortfolios
          ? html`<div class="portfolio-hint">Loading portfolios…</div>`
          : this._portfolios.length > 0
            ? html`
                <select class="portfolio-select" @change=${this._portfolioChanged}>
                  <option value="" ?selected=${!this._config.portfolio_id}>
                    Show portfolio picker in card
                  </option>
                  ${this._portfolios.map(
                    (p) => html`
                      <option
                        value=${p.id}
                        ?selected=${this._config?.portfolio_id === p.id}
                      >
                        ${p.name}
                      </option>
                    `,
                  )}
                </select>
              `
            : html`<div class="portfolio-hint">
                ${this._connected
                  ? 'No portfolios found'
                  : 'Connect to Parqet first, then re-open the editor'}
              </div>`}
      </div>

      <ha-form
        .hass=${this.hass}
        .data=${this._config}
        .schema=${ParqetCompanionCard.getConfigForm()}
        .computeLabel=${(s: { label?: string }) => s.label ?? ''}
        @value-changed=${this._valueChanged}
      ></ha-form>
    `;
  }

  private _portfolioChanged(e: Event): void {
    const val = (e.target as HTMLSelectElement).value;
    const config: ParqetCardConfig = { ...this._config! };
    if (val) {
      config.portfolio_id = val;
    } else {
      delete config.portfolio_id;
    }
    this.dispatchEvent(
      new CustomEvent('config-changed', { detail: { config }, bubbles: true, composed: true }),
    );
  }

  private _handleDisconnect(): void {
    oauthManager.clearToken(this._config?.client_id);
    this._connected = false;
  }

  private _valueChanged(ev: CustomEvent): void {
    this.dispatchEvent(
      new CustomEvent('config-changed', {
        detail: { config: ev.detail.value as ParqetCardConfig },
        bubbles: true,
        composed: true,
      }),
    );
  }

  static styles = css`
    .auth-row {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 12px 16px;
      margin-bottom: 8px;
      background: var(--secondary-background-color, #f5f5f5);
      border-radius: 8px;
    }
    .auth-status {
      display: flex;
      align-items: center;
      gap: 8px;
      font-size: 0.875rem;
      color: var(--primary-text-color);
    }
    .auth-dot {
      width: 8px;
      height: 8px;
      border-radius: 50%;
      flex-shrink: 0;
    }
    .auth-dot.connected    { background: #4caf50; }
    .auth-dot.disconnected { background: var(--secondary-text-color, #9e9e9e); }
    .auth-btn {
      padding: 4px 12px;
      border-radius: 4px;
      cursor: pointer;
      font-size: 0.8rem;
      transition: background 0.15s;
    }
    .auth-btn.connect {
      background: var(--primary-color, #03a9f4);
      color: white;
      border: none;
    }
    .auth-btn.connect:hover:not(:disabled) { opacity: 0.85; }
    .auth-btn.connect:disabled { opacity: 0.5; cursor: not-allowed; }
    .auth-btn.disconnect {
      background: none;
      border: 1px solid var(--error-color, #f44336);
      color: var(--error-color, #f44336);
    }
    .auth-btn.disconnect:hover { background: rgba(244, 67, 54, 0.08); }
    .auth-error {
      margin: 4px 0 8px;
      padding: 6px 12px;
      background: rgba(244, 67, 54, 0.1);
      color: var(--error-color, #f44336);
      border-radius: 6px;
      font-size: 0.8rem;
    }
    .portfolio-row {
      padding: 8px 16px 4px;
    }
    .portfolio-label {
      display: block;
      font-size: 0.75rem;
      font-weight: 500;
      color: var(--secondary-text-color);
      text-transform: uppercase;
      letter-spacing: 0.04em;
      margin-bottom: 6px;
    }
    .portfolio-select {
      width: 100%;
      padding: 8px 10px;
      border: 1px solid var(--divider-color, #e0e0e0);
      border-radius: 4px;
      background: var(--card-background-color, #fff);
      color: var(--primary-text-color);
      font-size: 0.875rem;
      cursor: pointer;
    }
    .portfolio-select:focus {
      outline: 2px solid var(--primary-color);
      outline-offset: 1px;
    }
    .portfolio-hint {
      font-size: 0.8rem;
      color: var(--secondary-text-color);
      font-style: italic;
    }
  `;
}
