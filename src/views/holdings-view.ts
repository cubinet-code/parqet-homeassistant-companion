import { LitElement, html, css, PropertyValues } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import type { ConnectClient } from '../api/connect-client';
import type { MCPClient } from '../api/mcp-client';
import type { ParqetCardConfig, Holding, PortfolioPerformance } from '../types';
import type { IntervalValue } from '../const';
import '../components/interval-selector';
import '../components/loading-spinner';

type AnyClient = ConnectClient | MCPClient;
type SortKey = 'name' | 'value' | 'pl' | 'plPct' | 'weight';

@customElement('parqet-holdings-view')
export class ParqetHoldingsView extends LitElement {
  @property() portfolioId = '';
  @property({ attribute: false }) client!: AnyClient;
  @property({ attribute: false }) config!: ParqetCardConfig;

  @state() private _data: PortfolioPerformance | null = null;
  @state() private _loading = false;
  @state() private _interval: IntervalValue = '1y';
  @state() private _error = '';
  @state() private _sortKey: SortKey = 'value';
  @state() private _sortAsc = false;
  @state() private _expandedId: string | null = null;

  connectedCallback() {
    super.connectedCallback();
    this._interval = (this.config?.default_interval as IntervalValue) ?? '1y';
    void this._load();
  }

  updated(changed: PropertyValues) {
    if (changed.has('portfolioId') && this.portfolioId) void this._load();
  }

  private async _load() {
    if (!this.portfolioId || !this.client) return;
    this._loading = true;
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
      this._loading = false;
    }
  }

  private async _onIntervalChange(e: CustomEvent) {
    this._interval = e.detail.interval as IntervalValue;
    await this._load();
  }

  private _handleSort(key: SortKey) {
    if (this._sortKey === key) {
      this._sortAsc = !this._sortAsc;
    } else {
      this._sortKey = key;
      this._sortAsc = false;
    }
  }

  private _sortHoldings(holdings: Holding[]): Holding[] {
    const total = holdings.reduce((s, h) => s + h.position.currentValue, 0);
    return [...holdings].sort((a, b) => {
      let va: number, vb: number;
      const plA = a.position.currentValue - a.position.purchaseValue;
      const plB = b.position.currentValue - b.position.purchaseValue;
      switch (this._sortKey) {
        case 'name':
          return this._sortAsc
            ? a.asset.name.localeCompare(b.asset.name)
            : b.asset.name.localeCompare(a.asset.name);
        case 'value':
          va = a.position.currentValue;
          vb = b.position.currentValue;
          break;
        case 'pl':
          va = plA;
          vb = plB;
          break;
        case 'plPct':
          va = a.position.purchaseValue > 0 ? plA / a.position.purchaseValue : 0;
          vb = b.position.purchaseValue > 0 ? plB / b.position.purchaseValue : 0;
          break;
        case 'weight':
          va = total > 0 ? a.position.currentValue / total : 0;
          vb = total > 0 ? b.position.currentValue / total : 0;
          break;
        default:
          return 0;
      }
      return this._sortAsc ? va - vb : vb - va;
    });
  }

  private _sym(): string {
    return this.config?.currency_symbol ?? '€';
  }

  private _fmtC(v: number | null | undefined): string {
    if (v == null) return '—';
    return `${this._sym()}${v.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
  }

  private _fmtNum(v: number | null | undefined, decimals = 4): string {
    if (v == null) return '—';
    return v.toLocaleString(undefined, {
      minimumFractionDigits: 0,
      maximumFractionDigits: decimals,
    });
  }

  private _sortIcon(key: SortKey): string {
    if (this._sortKey !== key) return ' ↕';
    return this._sortAsc ? ' ↑' : ' ↓';
  }

  render() {
    if (this._loading && !this._data) {
      return html`<parqet-loading-spinner></parqet-loading-spinner>`;
    }

    const holdings = this._data?.holdings ?? [];
    const active = holdings.filter((h) => !h.position.isSold);
    const sorted = this._sortHoldings(active);
    const total = active.reduce((s, h) => s + h.position.currentValue, 0);
    const showLogo = this.config?.show_logo !== false;
    const compact = !!this.config?.compact;

    return html`
      <parqet-interval-selector
        .selected=${this._interval}
        @interval-change=${this._onIntervalChange}
      ></parqet-interval-selector>

      ${this._error ? html`<div class="error" role="alert">${this._error}</div>` : ''}
      ${this._loading ? html`<parqet-loading-spinner></parqet-loading-spinner>` : ''}

      <div class="table-wrap">
        <table>
          <thead>
            <tr>
              ${showLogo ? html`<th class="logo-col"></th>` : ''}
              <th @click=${() => this._handleSort('name')}>Name${this._sortIcon('name')}</th>
              <th class="num" @click=${() => this._handleSort('value')}>
                Value${this._sortIcon('value')}
              </th>
              <th class="num" @click=${() => this._handleSort('pl')}>
                P&amp;L${this._sortIcon('pl')}
              </th>
              <th class="num" @click=${() => this._handleSort('plPct')}>
                P&amp;L %${this._sortIcon('plPct')}
              </th>
              <th class="num" @click=${() => this._handleSort('weight')}>
                Weight${this._sortIcon('weight')}
              </th>
            </tr>
          </thead>
          <tbody>
            ${sorted.map((h) => {
              const pl = h.position.currentValue - h.position.purchaseValue;
              const plPct =
                h.position.purchaseValue > 0 ? pl / h.position.purchaseValue : 0;
              const weight = total > 0 ? h.position.currentValue / total : 0;
              const plClass = pl > 0 ? 'positive' : pl < 0 ? 'negative' : '';
              const isExpanded = this._expandedId === h.holdingId;
              const ticker = h.asset.isin ?? h.asset.symbol ?? '';

              return html`
                <tr
                  class="row ${compact ? 'compact' : ''}"
                  @click=${() =>
                    (this._expandedId = isExpanded ? null : h.holdingId)}
                  role="button"
                  tabindex="0"
                  aria-expanded=${isExpanded}
                  @keydown=${(e: KeyboardEvent) => {
                    if (e.key === 'Enter' || e.key === ' ')
                      this._expandedId = isExpanded ? null : h.holdingId;
                  }}
                >
                  ${showLogo
                    ? html`<td class="logo-col">
                        ${h.logo
                          ? html`<img class="logo" src=${h.logo} alt="" loading="lazy" />`
                          : html`<div class="logo-placeholder"></div>`}
                      </td>`
                    : ''}
                  <td class="name-col">
                    <span class="holding-name">${h.nickname ?? h.asset.name}</span>
                    ${ticker ? html`<span class="ticker">${ticker}</span>` : ''}
                  </td>
                  <td class="num">${this._fmtC(h.position.currentValue)}</td>
                  <td class="num ${plClass}">${this._fmtC(pl)}</td>
                  <td class="num ${plClass}">
                    ${(plPct * 100 >= 0 ? '+' : '')}${(plPct * 100).toFixed(2)}%
                  </td>
                  <td class="num">${(weight * 100).toFixed(1)}%</td>
                </tr>
                ${isExpanded
                  ? html`
                      <tr class="expanded-row">
                        <td colspan=${showLogo ? 6 : 5}>
                          <div class="expanded">
                            <span>Shares: ${this._fmtNum(h.position.shares)}</span>
                            <span>Avg Price: ${this._fmtC(h.position.purchasePrice)}</span>
                            <span>Curr Price: ${this._fmtC(h.position.currentPrice)}</span>
                            <span>
                              XIRR:
                              ${h.kpis?.inInterval?.xirr != null
                                ? `${(h.kpis.inInterval.xirr * 100).toFixed(2)}%`
                                : '—'}
                            </span>
                            <span>
                              Dividends: ${this._fmtC(h.dividends?.inInterval?.amountGross)}
                            </span>
                            <span>Fees: ${this._fmtC(h.fees?.inInterval?.fees)}</span>
                          </div>
                        </td>
                      </tr>
                    `
                  : ''}
              `;
            })}
          </tbody>
        </table>
        ${sorted.length === 0 && !this._loading
          ? html`<div class="empty">No holdings found.</div>`
          : ''}
      </div>
    `;
  }

  static styles = css`
    :host {
      display: block;
    }
    .table-wrap {
      overflow-x: auto;
    }
    table {
      width: 100%;
      border-collapse: collapse;
      font-size: 0.83rem;
    }
    thead {
      position: sticky;
      top: 0;
      z-index: 1;
      background: var(--card-background-color, var(--primary-background-color));
    }
    th {
      padding: 8px 12px;
      text-align: left;
      color: var(--secondary-text-color);
      font-size: 0.72rem;
      font-weight: 600;
      text-transform: uppercase;
      letter-spacing: 0.04em;
      border-bottom: 1px solid var(--divider-color, #e0e0e0);
      cursor: pointer;
      user-select: none;
      white-space: nowrap;
    }
    th:hover {
      color: var(--primary-text-color);
    }
    th.num,
    td.num {
      text-align: right;
    }
    td {
      padding: 10px 12px;
      border-bottom: 1px solid var(--divider-color, #eee);
      color: var(--primary-text-color);
      vertical-align: middle;
    }
    .row {
      cursor: pointer;
      transition: background 0.12s;
    }
    .row:hover {
      background: var(--secondary-background-color, #f5f5f5);
    }
    .row:focus-visible {
      outline: 2px solid var(--primary-color);
      outline-offset: -2px;
    }
    .row.compact td {
      padding: 6px 12px;
    }
    .logo-col {
      width: 32px;
      padding-right: 4px;
    }
    .logo,
    .logo-placeholder {
      width: 24px;
      height: 24px;
      border-radius: 50%;
    }
    .logo-placeholder {
      background: var(--divider-color, #e0e0e0);
    }
    .name-col {
      max-width: 180px;
    }
    .holding-name {
      display: block;
      font-weight: 500;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
    .ticker {
      display: block;
      font-size: 0.7rem;
      color: var(--secondary-text-color);
    }
    .positive {
      color: var(--success-color, #4caf50);
    }
    .negative {
      color: var(--error-color, #f44336);
    }
    .expanded-row td {
      padding: 6px 12px 10px;
    }
    .expanded {
      display: flex;
      flex-wrap: wrap;
      gap: 12px;
      background: var(--secondary-background-color, #f5f5f5);
      border-radius: 6px;
      padding: 8px 12px;
      font-size: 0.78rem;
      color: var(--secondary-text-color);
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
    'parqet-holdings-view': ParqetHoldingsView;
  }
}
