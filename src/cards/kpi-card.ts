import { LitElement, html, css, PropertyValues } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';

import { oauthManager } from '../auth/oauth';
import { connectClient } from '../api/connect-client';
import { mcpClient } from '../api/mcp-client';

import type { KpiCardConfig, KpiMetric, PortfolioPerformance, Portfolio } from '../types';
import type { IntervalValue } from '../const';

import '../components/interval-selector';
import '../components/loading-spinner';
import '../components/auth-prompt';

// ─── Card ─────────────────────────────────────────────────────────────────────

@customElement('parqet-kpi-card')
export class ParqetKpiCard extends LitElement {
  @property({ attribute: false }) hass!: Record<string, unknown>;

  @state() private _config!: KpiCardConfig;
  @state() private _authenticated = false;
  @state() private _portfolioId: string | null = null;
  @state() private _data: PortfolioPerformance | null = null;
  @state() private _loading = false;
  @state() private _interval: IntervalValue = '1y';
  @state() private _error = '';

  setConfig(config: KpiCardConfig): void {
    this._config = { kpi: 'total_value', default_interval: '1y', currency_symbol: '€', show_interval_selector: true, ...config };
    this._interval = this._config.default_interval as IntervalValue;
    connectClient.configure(this._config.client_id);
    mcpClient.configure(this._config.client_id);
  }

  getCardSize(): number { return 2; }

  static getConfigElement(): HTMLElement {
    return document.createElement('parqet-kpi-card-editor');
  }

  static getStubConfig(): Partial<KpiCardConfig> {
    return { kpi: 'total_value', default_interval: '1y', currency_symbol: '€' };
  }

  connectedCallback() {
    super.connectedCallback();
    this._authenticated = oauthManager.isTokenValid(this._config?.client_id);
    if (this._authenticated) void this._loadData();
  }

  updated(changed: PropertyValues) {
    if (changed.has('hass') && !this._authenticated) {
      if (oauthManager.isTokenValid(this._config?.client_id)) {
        this._authenticated = true;
        void this._loadData();
      }
    }
  }

  private get _client() {
    return this._config?.data_source === 'mcp' ? mcpClient : connectClient;
  }

  private async _loadData() {
    this._loading = true;
    this._error = '';
    try {
      if (this._config.portfolio_id) {
        this._portfolioId = this._config.portfolio_id;
      } else {
        const portfolios = await this._client.listPortfolios();
        this._portfolioId = portfolios[0]?.id ?? null;
      }
      if (!this._portfolioId) {
        this._error = 'No portfolio found.';
        return;
      }
      const resp = await this._client.getPerformance(this._portfolioId, {
        type: 'relative',
        value: this._interval,
      });
      this._data = resp.performance;
    } catch (e) {
      this._error = e instanceof Error ? e.message : String(e);
      if (String(e).includes('401')) {
        oauthManager.clearToken(this._config?.client_id);
        this._authenticated = false;
      }
    } finally {
      this._loading = false;
    }
  }

  private async _onIntervalChange(e: CustomEvent) {
    this._interval = e.detail.interval as IntervalValue;
    await this._loadData();
  }

  // ─── Value extraction ───────────────────────────────────────────────────────

  private _extractValue(d: PortfolioPerformance): number | null {
    switch (this._config.kpi ?? 'total_value') {
      case 'total_value':      return d.valuation?.atIntervalEnd ?? null;
      case 'period_return': {
        const start = d.valuation?.atIntervalStart ?? 0;
        const end   = d.valuation?.atIntervalEnd   ?? 0;
        return start > 0 ? (end - start) / start : null;
      }
      case 'xirr':            return d.kpis?.inInterval?.xirr ?? null;
      case 'ttwror':          return d.kpis?.inInterval?.ttwror ?? null;
      case 'unrealized_gain': return d.unrealizedGains?.inInterval?.gainGross ?? null;
      case 'realized_gain':   return d.realizedGains?.inInterval?.gainGross ?? null;
      case 'dividends':       return d.dividends?.inInterval?.gainGross ?? null;
      case 'fees':            return d.fees?.inInterval?.fees ?? null;
      case 'taxes':           return d.taxes?.inInterval?.taxes ?? null;
      default:                return null;
    }
  }

  private _isPercent(kpi: KpiMetric): boolean {
    return ['period_return', 'xirr', 'ttwror'].includes(kpi);
  }

  private _kpiLabel(kpi: KpiMetric): string {
    const labels: Record<KpiMetric, string> = {
      total_value:      'Total Value',
      period_return:    'Period Return',
      xirr:             'XIRR',
      ttwror:           'TTWROR',
      unrealized_gain:  'Unrealized Gain',
      realized_gain:    'Realized Gain',
      dividends:        'Dividends',
      fees:             'Fees',
      taxes:            'Taxes',
    };
    return labels[kpi] ?? kpi;
  }

  private _formatValue(v: number | null, kpi: KpiMetric): string {
    if (v == null) return '—';
    const sym = this._config?.currency_symbol ?? '€';
    if (this._isPercent(kpi)) {
      const pct = v * 100;
      return `${pct >= 0 ? '+' : ''}${pct.toFixed(2)}%`;
    }
    return `${sym}${v.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
  }

  // ─── Render ─────────────────────────────────────────────────────────────────

  render() {
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

    const kpi    = this._config.kpi ?? 'total_value';
    const raw    = this._data ? this._extractValue(this._data) : null;
    const label  = this._kpiLabel(kpi);
    const value  = this._data ? this._formatValue(raw, kpi) : '—';
    const cls    = raw == null ? '' : raw > 0 ? 'positive' : raw < 0 ? 'negative' : '';

    return html`
      <ha-card>
        ${this._config.show_interval_selector !== false
          ? html`<parqet-interval-selector
              .selected=${this._interval}
              @interval-change=${this._onIntervalChange}
            ></parqet-interval-selector>`
          : ''}

        ${this._error ? html`<div class="error">${this._error}</div>` : ''}

        <div class="body">
          <div class="label">${label}</div>
          ${this._loading
            ? html`<parqet-loading-spinner></parqet-loading-spinner>`
            : html`<div class="value ${cls}">${value}</div>`}
        </div>
      </ha-card>
    `;
  }

  static styles = css`
    :host { display: block; }
    ha-card { overflow: hidden; }
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
    .hint { font-size: 0.75rem; opacity: 0.7; }
    .body {
      padding: 8px 20px 20px;
      display: flex;
      flex-direction: column;
      gap: 2px;
    }
    .label {
      font-size: 0.65rem;
      font-weight: 600;
      text-transform: uppercase;
      letter-spacing: 0.06em;
      color: var(--secondary-text-color);
    }
    .value {
      font-size: 1.8rem;
      font-weight: 700;
      color: var(--primary-text-color);
      line-height: 1.15;
    }
    .value.positive { color: var(--success-color, #4caf50); }
    .value.negative { color: var(--error-color, #f44336); }
    .error {
      margin: 0 16px 8px;
      padding: 6px 10px;
      background: rgba(244, 67, 54, 0.1);
      color: var(--error-color, #f44336);
      border-radius: 6px;
      font-size: 0.8rem;
    }
  `;
}

// ─── Editor ───────────────────────────────────────────────────────────────────

@customElement('parqet-kpi-card-editor')
class ParqetKpiCardEditor extends LitElement {
  @property({ attribute: false }) hass!: Record<string, unknown>;
  @state() private _config?: KpiCardConfig;
  @state() private _connected = false;
  @state() private _authLoading = false;
  @state() private _portfolios: Portfolio[] = [];
  @state() private _loadingPortfolios = false;
  @state() private _authError = '';

  setConfig(config: KpiCardConfig): void {
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
      // silent
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

  private _handleDisconnect(): void {
    oauthManager.clearToken(this._config?.client_id);
    this._connected = false;
    this._portfolios = [];
  }

  static getConfigForm() {
    return [
      {
        name: 'kpi',
        label: 'Metric to display',
        selector: {
          select: {
            options: [
              { value: 'total_value',     label: 'Total Value' },
              { value: 'period_return',   label: 'Period Return' },
              { value: 'xirr',            label: 'XIRR' },
              { value: 'ttwror',          label: 'TTWROR' },
              { value: 'unrealized_gain', label: 'Unrealized Gain' },
              { value: 'realized_gain',   label: 'Realized Gain' },
              { value: 'dividends',       label: 'Dividends' },
              { value: 'fees',            label: 'Fees' },
              { value: 'taxes',           label: 'Taxes' },
            ],
          },
        },
      },
      {
        name: 'default_interval',
        label: 'Time Interval',
        selector: {
          select: {
            options: [
              { value: '1d',  label: '1 Day' },
              { value: '1w',  label: '1 Week' },
              { value: 'mtd', label: 'Month to Date' },
              { value: '1m',  label: '1 Month' },
              { value: '3m',  label: '3 Months' },
              { value: '6m',  label: '6 Months' },
              { value: '1y',  label: '1 Year' },
              { value: 'ytd', label: 'Year to Date' },
              { value: '3y',  label: '3 Years' },
              { value: '5y',  label: '5 Years' },
              { value: '10y', label: '10 Years' },
              { value: 'max', label: 'All Time' },
            ],
          },
        },
      },
      { name: 'show_interval_selector', label: 'Show interval selector on card', selector: { boolean: {} } },
      {
        name: 'data_source',
        label: 'Data Source',
        selector: {
          select: {
            options: [
              { value: 'rest', label: 'Connect REST API (recommended)' },
              { value: 'mcp',  label: 'MCP Server (mcp.parqet.com)' },
            ],
          },
        },
      },
      {
        type: 'expandable',
        title: 'Display',
        flatten: true,
        schema: [
          { name: 'currency_symbol', label: 'Currency Symbol', selector: { text: {} } },
        ],
      },
      {
        type: 'expandable',
        title: 'Advanced',
        flatten: true,
        schema: [
          {
            name: 'client_id',
            label: 'Parqet Connect Client ID (leave blank to use shared default)',
            selector: { text: {} },
          },
          {
            name: 'redirect_uri',
            label: 'OAuth Redirect URI (required when using your own Client ID)',
            selector: { text: {} },
          },
        ],
      },
    ];
  }

  render() {
    if (!this._config || !this.hass) return html``;
    return html`
      <!-- Auth row -->
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
                    Use first portfolio automatically
                  </option>
                  ${this._portfolios.map(
                    (p) => html`
                      <option value=${p.id} ?selected=${this._config?.portfolio_id === p.id}>
                        ${p.name}
                      </option>
                    `,
                  )}
                </select>
              `
            : html`<div class="portfolio-hint">
                ${this._connected ? 'No portfolios found' : 'Connect to load portfolios'}
              </div>`}
      </div>

      <ha-form
        .hass=${this.hass}
        .data=${this._config}
        .schema=${ParqetKpiCardEditor.getConfigForm()}
        .computeLabel=${(s: { label?: string }) => s.label ?? ''}
        @value-changed=${this._valueChanged}
      ></ha-form>
    `;
  }

  private _portfolioChanged(e: Event): void {
    const val = (e.target as HTMLSelectElement).value;
    const config: KpiCardConfig = { ...this._config! };
    if (val) { config.portfolio_id = val; } else { delete config.portfolio_id; }
    this._fire(config);
  }

  private _valueChanged(ev: CustomEvent): void {
    this._fire(ev.detail.value as KpiCardConfig);
  }

  private _fire(config: KpiCardConfig): void {
    this.dispatchEvent(
      new CustomEvent('config-changed', { detail: { config }, bubbles: true, composed: true }),
    );
  }

  static styles = css`
    .auth-row {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 12px 16px;
      margin-bottom: 4px;
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
      width: 8px; height: 8px;
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
    .portfolio-row { padding: 8px 16px 4px; }
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
    .portfolio-select:focus { outline: 2px solid var(--primary-color); outline-offset: 1px; }
    .portfolio-hint { font-size: 0.8rem; color: var(--secondary-text-color); font-style: italic; }
  `;
}

declare global {
  interface HTMLElementTagNameMap {
    'parqet-kpi-card': ParqetKpiCard;
    'parqet-kpi-card-editor': ParqetKpiCardEditor;
  }
}
