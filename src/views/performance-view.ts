import { LitElement, html, css, PropertyValues } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import type { ConnectClient } from '../api/connect-client';
import type { MCPClient } from '../api/mcp-client';
import type { ParqetCardConfig, PortfolioPerformance } from '../types';
import type { StackedSegment } from '../components/stacked-bar';
import type { IntervalValue } from '../const';
import '../components/interval-selector';
import '../components/loading-spinner';
import '../components/stacked-bar';

type AnyClient = ConnectClient | MCPClient;

@customElement('parqet-performance-view')
export class ParqetPerformanceView extends LitElement {
  @property() portfolioId = '';
  @property({ attribute: false }) client!: AnyClient;
  @property({ attribute: false }) config!: ParqetCardConfig;
  @property({ type: Number }) refreshTrigger = 0;

  @state() private _data: PortfolioPerformance | null = null;
  @state() private _loading = false;
  @state() private _interval: IntervalValue = '1y';
  @state() private _error = '';

  connectedCallback() {
    super.connectedCallback();
    this._interval = (this.config?.default_interval as IntervalValue) ?? '1y';
    void this._load();
  }

  updated(changed: PropertyValues) {
    if (changed.has('portfolioId') && this.portfolioId) {
      void this._load();
    }
    if (changed.has('refreshTrigger') && changed.get('refreshTrigger') !== undefined) {
      void this._load(true);
    }
  }

  private async _load(silent = false) {
    if (!this.portfolioId || !this.client) return;
    if (!silent) this._loading = true;
    this._error = '';
    try {
      const resp = await this.client.getPerformance(this.portfolioId, {
        type: 'relative',
        value: this._interval,
      });
      this._data = resp.performance;
    } catch (e) {
      this._error = e instanceof Error ? e.message : String(e);
    } finally {
      if (!silent) this._loading = false;
    }
  }

  private async _onIntervalChange(e: CustomEvent) {
    this._interval = e.detail.interval as IntervalValue;
    await this._load();
  }

  // ─── Formatting helpers ──────────────────────────────────────────────────────

  private _sym(): string {
    return this.config?.currency_symbol ?? '€';
  }

  private _fmtCurrency(v: number | null | undefined): string {
    if (v == null) return '—';
    return `${this._sym()}${v.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
  }

  /** Format a value that is already a percentage (e.g. API returns 12.61 for 12.61%). */
  private _fmtPct(v: number | null | undefined): string {
    if (v == null) return '—';
    return `${v >= 0 ? '+' : ''}${v.toFixed(2)}%`;
  }

  private _kpiClass(v: number | null | undefined): string {
    if (v == null) return '';
    return v > 0 ? 'positive' : v < 0 ? 'negative' : '';
  }

  render() {
    const d = this._data;

    return html`
      ${this.config?.show_interval_selector !== false
        ? html`<parqet-interval-selector
            .selected=${this._interval}
            @interval-change=${this._onIntervalChange}
          ></parqet-interval-selector>`
        : ''}

      ${this._error ? html`<div class="error" role="alert">${this._error}</div>` : ''}
      ${this._loading ? html`<parqet-loading-spinner></parqet-loading-spinner>` : ''}

      ${d
        ? html`
            <div class="kpi-grid ${this.config?.compact ? 'compact' : ''}">
              ${this._renderKpi(
                'Total Value',
                this._fmtCurrency(d.valuation?.atIntervalEnd),
              )}
              ${this._renderKpi(
                'XIRR',
                this._fmtPct(d.kpis?.inInterval?.xirr),
                d.kpis?.inInterval?.xirr,
              )}
              ${this._renderKpi(
                'TTWROR',
                this._fmtPct(d.kpis?.inInterval?.ttwror),
                d.kpis?.inInterval?.ttwror,
              )}
              ${this._renderKpi(
                'Unrealized Gain',
                this._fmtCurrency(d.unrealizedGains?.inInterval?.gainGross),
                d.unrealizedGains?.inInterval?.gainGross,
              )}
              ${(() => {
                const start = d.valuation?.atIntervalStart ?? 0;
                const end = d.valuation?.atIntervalEnd ?? 0;
                const periodReturn = start > 0 ? ((end - start) / start) * 100 : null;
                return this._renderKpi('Period Return', this._fmtPct(periodReturn), periodReturn);
              })()}
              ${this._renderKpi(
                'Realized Gain',
                this._fmtCurrency(d.realizedGains?.inInterval?.gainGross),
                d.realizedGains?.inInterval?.gainGross,
              )}
              ${this._renderKpi(
                'Dividends',
                this._fmtCurrency(d.dividends?.inInterval?.gainGross),
              )}
              ${this._renderKpi('Fees', this._fmtCurrency(d.fees?.inInterval?.fees))}
              ${this._renderKpi('Taxes', this._fmtCurrency(d.taxes?.inInterval?.taxes))}
            </div>
            ${this.config?.show_chart !== false ? this._renderBreakdownChart(d) : ''}
          `
        : !this._loading
          ? html`<div class="empty">No data available.</div>`
          : ''}
    `;
  }

  private _renderBreakdownChart(d: PortfolioPerformance) {
    const segments: StackedSegment[] = [
      { label: 'Unrealized', value: d.unrealizedGains?.inInterval?.gainGross ?? 0, color: 'var(--success-color, #4caf50)' },
      { label: 'Realized', value: d.realizedGains?.inInterval?.gainGross ?? 0, color: '#4285f4' },
      { label: 'Dividends', value: d.dividends?.inInterval?.gainGross ?? 0, color: '#46bdc6' },
      { label: 'Fees', value: -(d.fees?.inInterval?.fees ?? 0), color: '#ff6d01' },
      { label: 'Taxes', value: -(d.taxes?.inInterval?.taxes ?? 0), color: 'var(--error-color, #f44336)' },
    ].filter((s) => s.value !== 0);

    if (segments.length === 0) return '';

    return html`
      <parqet-stacked-bar
        .segments=${segments}
        .currencySymbol=${this._sym()}
      ></parqet-stacked-bar>
    `;
  }

  private _renderKpi(label: string, value: string, rawValue?: number | null) {
    return html`
      <div class="kpi-tile">
        <div class="kpi-label">${label}</div>
        <div class="kpi-value ${this._kpiClass(rawValue)}">${value}</div>
      </div>
    `;
  }

  static styles = css`
    :host {
      display: block;
      overflow: hidden;
      min-width: 0;
    }
    .kpi-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(130px, 1fr));
      gap: 8px;
      padding: 8px 16px 16px;
    }
    .kpi-grid.compact {
      grid-template-columns: repeat(auto-fill, minmax(100px, 1fr));
      gap: 4px;
      padding: 6px 10px 10px;
    }
    .kpi-tile {
      background: var(--secondary-background-color, #f5f5f5);
      border-radius: 8px;
      padding: 10px 12px;
    }
    .kpi-grid.compact .kpi-tile {
      padding: 6px 8px;
      border-radius: 6px;
    }
    .kpi-label {
      font-size: 0.68rem;
      color: var(--secondary-text-color);
      text-transform: uppercase;
      letter-spacing: 0.05em;
      margin-bottom: 4px;
    }
    .kpi-grid.compact .kpi-label {
      font-size: 0.6rem;
      margin-bottom: 2px;
    }
    .kpi-value {
      font-size: 0.95rem;
      font-weight: 600;
      color: var(--primary-text-color);
    }
    .kpi-grid.compact .kpi-value {
      font-size: 0.8rem;
    }
    .kpi-value.positive {
      color: var(--success-color, #4caf50);
    }
    .kpi-value.negative {
      color: var(--error-color, #f44336);
    }
    .error {
      margin: 8px 16px;
      padding: 8px 12px;
      background: rgba(244, 67, 54, 0.1);
      color: var(--error-color, #f44336);
      border-radius: 6px;
      font-size: 0.82rem;
    }
    .empty {
      padding: 24px;
      text-align: center;
      color: var(--secondary-text-color);
      font-size: 0.875rem;
    }
  `;
}

declare global {
  interface HTMLElementTagNameMap {
    'parqet-performance-view': ParqetPerformanceView;
  }
}
