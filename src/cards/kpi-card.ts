import { LitElement, html, css, PropertyValues } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';

import { oauthManager } from '../auth/oauth';
import { connectClient } from '../api/connect-client';
import { mcpClient } from '../api/mcp-client';

import { MCP_CLIENT_ID } from '../const';
import type { KpiCardConfig, KpiMetric, KpiLayout, PortfolioPerformance, Portfolio } from '../types';
import type { IntervalValue } from '../const';

/** Returns the OAuth client_id to use for the given config's data source. */
function effectiveClientId(config?: KpiCardConfig): string | undefined {
  return config?.data_source === 'mcp' ? MCP_CLIENT_ID : config?.client_id;
}

import '../components/interval-selector';
import '../components/loading-spinner';

const KPI_OPTIONS: { value: KpiMetric; label: string }[] = [
  { value: 'total_value',     label: 'Total Value' },
  { value: 'period_return',   label: 'Period Return' },
  { value: 'xirr',            label: 'XIRR' },
  { value: 'ttwror',          label: 'TTWROR' },
  { value: 'unrealized_gain', label: 'Unrealized Gain' },
  { value: 'realized_gain',   label: 'Realized Gain' },
  { value: 'dividends',       label: 'Dividends' },
  { value: 'fees',            label: 'Fees' },
  { value: 'taxes',           label: 'Taxes' },
];

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
    const c: KpiCardConfig = {
      kpi: 'total_value',
      default_interval: '1y',
      currency_symbol: '€',
      show_interval_selector: true,
      layout: 'vertical',
      ...config,
    };
    // Migrate legacy single secondary_kpi → secondary_kpis array
    if (c.secondary_kpi && !c.secondary_kpis?.length) {
      c.secondary_kpis = [c.secondary_kpi];
    }
    delete c.secondary_kpi;
    if (c.secondary_kpis) {
      c.secondary_kpis = [...new Set(c.secondary_kpis)];
    }
    this._config = c;
    this._interval = this._config.default_interval as IntervalValue;
    const cid = effectiveClientId(this._config);
    connectClient.configure(this._config.client_id);
    mcpClient.configure(cid);
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
    this._authenticated = oauthManager.isTokenValid(effectiveClientId(this._config));
    if (this._authenticated) void this._loadData();
  }

  updated(changed: PropertyValues) {
    if (changed.has('hass') && !this._authenticated) {
      if (oauthManager.isTokenValid(effectiveClientId(this._config))) {
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
        oauthManager.clearToken(effectiveClientId(this._config));
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

  // ─── Value helpers ──────────────────────────────────────────────────────────

  private _extract(d: PortfolioPerformance, kpi: KpiMetric): number | null {
    switch (kpi) {
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

  private _label(kpi: KpiMetric): string {
    return KPI_OPTIONS.find((o) => o.value === kpi)?.label ?? kpi;
  }

  private _format(v: number | null, kpi: KpiMetric): string {
    if (v == null) return '—';
    const sym = this._config?.currency_symbol ?? '€';
    if (this._isPercent(kpi)) {
      const pct = v * 100;
      return `${pct >= 0 ? '+' : ''}${pct.toFixed(2)}%`;
    }
    return `${sym}${v.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
  }

  private _colorClass(v: number | null, kpi: KpiMetric): string {
    if (v == null || kpi === 'total_value') return '';
    return v > 0 ? 'positive' : v < 0 ? 'negative' : '';
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

    const primaryKpi = this._config.kpi ?? 'total_value';
    const secondaryKpis = this._config.secondary_kpis ?? [];
    const layout = this._config.layout ?? 'vertical';

    const primaryRaw = this._data ? this._extract(this._data, primaryKpi) : null;
    const primaryVal = this._data ? this._format(primaryRaw, primaryKpi) : '—';
    const primaryCls = this._colorClass(primaryRaw, primaryKpi);

    const secondaries = secondaryKpis.map((kpi) => {
      const raw = this._data ? this._extract(this._data, kpi) : null;
      const val = this._data ? this._format(raw, kpi) : null;
      const cls = this._colorClass(raw, kpi);
      return { kpi, val, cls };
    });

    return html`
      <ha-card>
        ${this._config.show_interval_selector !== false
          ? html`<parqet-interval-selector
              .selected=${this._interval}
              @interval-change=${this._onIntervalChange}
            ></parqet-interval-selector>`
          : ''}

        ${this._error ? html`<div class="error">${this._error}</div>` : ''}

        <div class="body ${layout}">
          ${layout === 'horizontal'
            ? this._renderHorizontal(primaryKpi, primaryVal, primaryCls, secondaries)
            : this._renderVertical(primaryKpi, primaryVal, primaryCls, secondaries)}
        </div>
      </ha-card>
    `;
  }

  private _renderVertical(
    primaryKpi: KpiMetric, primaryVal: string, primaryCls: string,
    secondaries: Array<{ kpi: KpiMetric; val: string | null; cls: string }>,
  ) {
    return html`
      <div class="primary-block">
        <div class="label">${this._label(primaryKpi)}</div>
        ${this._loading
          ? html`<parqet-loading-spinner></parqet-loading-spinner>`
          : html`<div class="value ${primaryCls}">${primaryVal}</div>`}
      </div>
      ${secondaries.map((s) =>
        s.val != null
          ? html`<div class="secondary-block">
              <span class="secondary-label">${this._label(s.kpi)}</span>
              <span class="secondary-value ${s.cls}">${s.val}</span>
            </div>`
          : ''
      )}
    `;
  }

  private _renderHorizontal(
    primaryKpi: KpiMetric, primaryVal: string, primaryCls: string,
    secondaries: Array<{ kpi: KpiMetric; val: string | null; cls: string }>,
  ) {
    return html`
      <div class="h-labels">
        <div class="label">${this._label(primaryKpi)}</div>
        ${secondaries.map((s) =>
          html`<div class="secondary-label">${this._label(s.kpi)}</div>`
        )}
      </div>
      <div class="h-values">
        ${this._loading
          ? html`<parqet-loading-spinner></parqet-loading-spinner>`
          : html`<div class="value ${primaryCls}">${primaryVal}</div>`}
        ${secondaries.map((s) =>
          s.val != null
            ? html`<div class="secondary-value ${s.cls}">${s.val}</div>`
            : ''
        )}
      </div>
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
    .error {
      margin: 0 16px 8px;
      padding: 6px 10px;
      background: rgba(244, 67, 54, 0.1);
      color: var(--error-color, #f44336);
      border-radius: 6px;
      font-size: 0.8rem;
    }

    /* ── Vertical layout ── */
    .body.vertical {
      padding: 8px 20px 20px;
      display: flex;
      flex-direction: column;
      gap: 6px;
    }
    .primary-block { display: flex; flex-direction: column; gap: 2px; }
    .secondary-block {
      display: flex;
      align-items: baseline;
      gap: 6px;
    }

    /* ── Horizontal layout ── */
    .body.horizontal {
      padding: 8px 20px 16px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 12px;
    }
    .h-labels {
      display: flex;
      flex-direction: column;
      gap: 2px;
      min-width: 0;
    }
    .h-values {
      display: flex;
      flex-direction: column;
      align-items: flex-end;
      gap: 2px;
      flex-shrink: 0;
    }

    /* ── Shared text styles ── */
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
    .body.horizontal .value { font-size: 1.5rem; }
    .value.positive { color: var(--success-color, #4caf50); }
    .value.negative { color: var(--error-color, #f44336); }
    .secondary-label {
      font-size: 0.65rem;
      font-weight: 600;
      text-transform: uppercase;
      letter-spacing: 0.05em;
      color: var(--secondary-text-color);
    }
    .secondary-value {
      font-size: 0.9rem;
      font-weight: 600;
      color: var(--primary-text-color);
    }
    .secondary-value.positive { color: var(--success-color, #4caf50); }
    .secondary-value.negative { color: var(--error-color, #f44336); }
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
  @state() private _addingSecondary = false;

  setConfig(config: KpiCardConfig): void {
    const c = { ...config };
    // Migrate legacy single secondary_kpi → secondary_kpis array
    if (c.secondary_kpi && !c.secondary_kpis?.length) {
      c.secondary_kpis = [c.secondary_kpi];
    }
    delete c.secondary_kpi;
    if (c.secondary_kpis) {
      c.secondary_kpis = [...new Set(c.secondary_kpis)];
    }
    this._config = c;
    this._connected = oauthManager.isTokenValid(effectiveClientId(c));
    if (this._connected && this._portfolios.length === 0) {
      void this._fetchPortfolios();
    }
  }

  private async _fetchPortfolios(): Promise<void> {
    this._loadingPortfolios = true;
    try {
      const client = this._config?.data_source === 'mcp' ? mcpClient : connectClient;
      client.configure(effectiveClientId(this._config));
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
    const cid = effectiveClientId(this._config);
    const redirect = this._config?.data_source === 'mcp' ? undefined : this._config?.redirect_uri;
    const popup = window.open('', 'parqet-auth', 'width=520,height=720,scrollbars=yes,resizable=yes');
    try {
      await oauthManager.startAuth(cid, redirect, popup);
      this._connected = true;
      void this._fetchPortfolios();
    } catch (e) {
      this._authError = e instanceof Error ? e.message : String(e);
    } finally {
      this._authLoading = false;
    }
  }

  private _handleDisconnect(): void {
    oauthManager.clearToken(effectiveClientId(this._config));
    this._connected = false;
    this._portfolios = [];
  }

  static getConfigForm() {
    return [
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
              { value: 'mcp',  label: 'MCP Server (experimental)' },
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

    const primaryKpi = this._config.kpi ?? 'total_value';
    const secondaryKpis = this._config.secondary_kpis ?? [];
    const layout = this._config.layout ?? 'vertical';

    // KPIs already in use (primary + all secondaries)
    const usedKpis = new Set<KpiMetric>([primaryKpi, ...secondaryKpis]);
    // Options available to add as a new secondary
    const availableForSecondary = KPI_OPTIONS.filter((o) => !usedKpis.has(o.value));

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
      <div class="section-row">
        <label class="section-label">Portfolio</label>
        ${this._loadingPortfolios
          ? html`<div class="hint-text">Loading portfolios…</div>`
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
            : html`<div class="hint-text">
                ${this._connected ? 'No portfolios found' : 'Connect to load portfolios'}
              </div>`}
      </div>

      <!-- Content section (chip-style) -->
      <div class="section-row">
        <label class="section-label">Content</label>
        <div class="chip-row">
          <!-- Primary metric chip — always present, click to change via select -->
          <div class="chip primary-chip">
            <span class="chip-icon">≡</span>
            <select
              class="chip-select"
              @change=${this._primaryChanged}
            >
              ${KPI_OPTIONS.map(
                (o) => html`<option value=${o.value} ?selected=${o.value === primaryKpi}>${o.label}</option>`,
              )}
            </select>
          </div>

          <!-- Secondary metric chips -->
          ${secondaryKpis.map((sec, idx) => html`
            <div class="chip secondary-chip">
              <span class="chip-icon">≡</span>
              <select class="chip-select" @change=${(e: Event) => this._secondaryChanged(e, idx)}>
                ${KPI_OPTIONS
                  .filter((o) => o.value === sec || !usedKpis.has(o.value))
                  .map((o) => html`<option value=${o.value} ?selected=${o.value === sec}>${o.label}</option>`)}
              </select>
              <button class="chip-remove" @click=${() => this._removeSecondary(idx)} aria-label="Remove">×</button>
            </div>
          `)}

          <!-- Add button -->
          ${this._addingSecondary
            ? html`
                <div class="chip secondary-chip adding">
                  <select class="chip-select" @change=${this._pickSecondary} @blur=${this._cancelAddSecondary}>
                    <option value="">— pick a metric —</option>
                    ${availableForSecondary.map(
                      (o) => html`<option value=${o.value}>${o.label}</option>`,
                    )}
                  </select>
                  <button class="chip-remove" @click=${this._cancelAddSecondary} aria-label="Cancel">×</button>
                </div>
              `
            : availableForSecondary.length > 0
              ? html`<button class="add-chip" @click=${() => (this._addingSecondary = true)}>+ Add</button>`
              : ''}
        </div>
      </div>

      <!-- Layout picker -->
      <div class="section-row">
        <label class="section-label">Content layout</label>
        <div class="layout-row">
          <button
            class="layout-option ${layout === 'vertical' ? 'selected' : ''}"
            @click=${() => this._setLayout('vertical')}
          >
            <div class="layout-thumb vertical-thumb">
              <div class="lt-label"></div>
              <div class="lt-value"></div>
              <div class="lt-secondary"></div>
            </div>
            <span>Vertical</span>
          </button>
          <button
            class="layout-option ${layout === 'horizontal' ? 'selected' : ''}"
            @click=${() => this._setLayout('horizontal')}
          >
            <div class="layout-thumb horizontal-thumb">
              <div class="lt-left">
                <div class="lt-label"></div>
                <div class="lt-secondary"></div>
              </div>
              <div class="lt-value-right"></div>
            </div>
            <span>Horizontal</span>
          </button>
        </div>
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

  private _primaryChanged(e: Event): void {
    const kpi = (e.target as HTMLSelectElement).value as KpiMetric;
    const config: KpiCardConfig = { ...this._config!, kpi };
    // Remove new primary from secondaries if it conflicts
    config.secondary_kpis = (config.secondary_kpis ?? []).filter((s) => s !== kpi);
    this._fire(config);
  }

  private _secondaryChanged(e: Event, index: number): void {
    const kpi = (e.target as HTMLSelectElement).value as KpiMetric;
    const kpis = [...(this._config!.secondary_kpis ?? [])];
    kpis[index] = kpi;
    this._fire({ ...this._config!, secondary_kpis: kpis });
  }

  private _removeSecondary(index: number): void {
    const kpis = [...(this._config!.secondary_kpis ?? [])];
    kpis.splice(index, 1);
    this._fire({ ...this._config!, secondary_kpis: kpis });
  }

  private _pickSecondary(e: Event): void {
    const val = (e.target as HTMLSelectElement).value as KpiMetric;
    if (!val) return;
    this._addingSecondary = false;
    const kpis = [...(this._config!.secondary_kpis ?? []), val];
    this._fire({ ...this._config!, secondary_kpis: kpis });
  }

  private _cancelAddSecondary(): void {
    // small delay so click on × fires before blur hides it
    setTimeout(() => { this._addingSecondary = false; }, 150);
  }

  private _setLayout(layout: KpiLayout): void {
    this._fire({ ...this._config!, layout });
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
    /* ── Auth row ── */
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
    .auth-dot { width: 8px; height: 8px; border-radius: 50%; flex-shrink: 0; }
    .auth-dot.connected    { background: #4caf50; }
    .auth-dot.disconnected { background: var(--secondary-text-color, #9e9e9e); }
    .auth-btn {
      padding: 4px 12px; border-radius: 4px; cursor: pointer;
      font-size: 0.8rem; transition: background 0.15s;
    }
    .auth-btn.connect { background: var(--primary-color, #03a9f4); color: white; border: none; }
    .auth-btn.connect:hover:not(:disabled) { opacity: 0.85; }
    .auth-btn.connect:disabled { opacity: 0.5; cursor: not-allowed; }
    .auth-btn.disconnect { background: none; border: 1px solid var(--error-color, #f44336); color: var(--error-color, #f44336); }
    .auth-btn.disconnect:hover { background: rgba(244, 67, 54, 0.08); }
    .auth-error {
      margin: 4px 0 8px; padding: 6px 12px;
      background: rgba(244, 67, 54, 0.1); color: var(--error-color, #f44336);
      border-radius: 6px; font-size: 0.8rem;
    }

    /* ── Shared section layout ── */
    .section-row { padding: 10px 16px 6px; }
    .section-label {
      display: block;
      font-size: 0.75rem;
      font-weight: 500;
      color: var(--secondary-text-color);
      text-transform: uppercase;
      letter-spacing: 0.04em;
      margin-bottom: 8px;
    }
    .hint-text { font-size: 0.8rem; color: var(--secondary-text-color); font-style: italic; }

    /* ── Portfolio select ── */
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

    /* ── Chip row ── */
    .chip-row {
      display: flex;
      flex-wrap: wrap;
      gap: 6px;
      align-items: center;
    }
    .chip {
      display: inline-flex;
      align-items: center;
      gap: 4px;
      padding: 4px 8px;
      border: 1px solid var(--divider-color, #e0e0e0);
      border-radius: 16px;
      background: var(--secondary-background-color, #f5f5f5);
      font-size: 0.8rem;
    }
    .chip-icon { font-size: 0.75rem; color: var(--secondary-text-color); }
    .chip-select {
      border: none;
      background: transparent;
      color: var(--primary-text-color);
      font-size: 0.8rem;
      cursor: pointer;
      padding: 0;
      outline: none;
    }
    .chip-remove {
      background: none;
      border: none;
      cursor: pointer;
      color: var(--secondary-text-color);
      font-size: 1rem;
      line-height: 1;
      padding: 0 2px;
      transition: color 0.1s;
    }
    .chip-remove:hover { color: var(--error-color, #f44336); }
    .add-chip {
      padding: 4px 10px;
      border: 1px dashed var(--divider-color, #bdbdbd);
      border-radius: 16px;
      background: none;
      color: var(--secondary-text-color);
      font-size: 0.8rem;
      cursor: pointer;
      transition: border-color 0.15s, color 0.15s;
    }
    .add-chip:hover { border-color: var(--primary-color); color: var(--primary-color); }

    /* ── Layout picker ── */
    .layout-row { display: flex; gap: 12px; }
    .layout-option {
      flex: 1;
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 6px;
      padding: 10px 8px;
      border: 2px solid var(--divider-color, #e0e0e0);
      border-radius: 8px;
      background: none;
      cursor: pointer;
      color: var(--secondary-text-color);
      font-size: 0.78rem;
      transition: border-color 0.15s, color 0.15s;
    }
    .layout-option.selected {
      border-color: var(--primary-color, #03a9f4);
      color: var(--primary-color, #03a9f4);
      background: rgba(3, 169, 244, 0.06);
    }
    .layout-option:hover:not(.selected) { border-color: var(--secondary-text-color); color: var(--primary-text-color); }

    /* Thumbnail sketches */
    .layout-thumb {
      width: 64px; height: 44px;
      border-radius: 4px;
      background: var(--card-background-color, #fff);
      border: 1px solid var(--divider-color, #e0e0e0);
      padding: 6px 8px;
      box-sizing: border-box;
    }
    .vertical-thumb { display: flex; flex-direction: column; gap: 4px; justify-content: center; }
    .lt-label  { height: 5px; width: 60%; border-radius: 2px; background: var(--secondary-text-color, #9e9e9e); opacity: 0.5; }
    .lt-value  { height: 10px; width: 85%; border-radius: 2px; background: var(--primary-text-color, #333); opacity: 0.6; }
    .lt-secondary { height: 5px; width: 45%; border-radius: 2px; background: var(--secondary-text-color, #9e9e9e); opacity: 0.4; }

    .horizontal-thumb { display: flex; align-items: center; justify-content: space-between; }
    .lt-left { display: flex; flex-direction: column; gap: 4px; }
    .lt-value-right { height: 10px; width: 36%; border-radius: 2px; background: var(--primary-text-color, #333); opacity: 0.6; }
  `;
}

declare global {
  interface HTMLElementTagNameMap {
    'parqet-kpi-card': ParqetKpiCard;
    'parqet-kpi-card-editor': ParqetKpiCardEditor;
  }
}
