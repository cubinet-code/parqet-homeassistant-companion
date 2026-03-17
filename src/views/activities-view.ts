import { LitElement, html, css, PropertyValues } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import type { ConnectClient } from '../api/connect-client';
import type { MCPClient } from '../api/mcp-client';
import type { ParqetCardConfig, Activity, ActivityType } from '../types';
import '../components/loading-spinner';

type AnyClient = ConnectClient | MCPClient;

const ACTIVITY_FILTERS: { value: ActivityType | 'all'; label: string; color: string }[] = [
  { value: 'all', label: 'All', color: 'var(--primary-color, #03a9f4)' },
  { value: 'buy', label: 'Buy', color: '#4caf50' },
  { value: 'sell', label: 'Sell', color: '#f44336' },
  { value: 'dividend', label: 'Dividend', color: '#2196f3' },
  { value: 'interest', label: 'Interest', color: '#00bcd4' },
  { value: 'transfer_in', label: 'Transfer In', color: '#9c27b0' },
  { value: 'transfer_out', label: 'Transfer Out', color: '#7b1fa2' },
  { value: 'fees_taxes', label: 'Fees/Taxes', color: '#ff9800' },
  { value: 'deposit', label: 'Deposit', color: '#009688' },
  { value: 'withdrawal', label: 'Withdrawal', color: '#795548' },
];

const TYPE_COLOR: Record<string, string> = Object.fromEntries(
  ACTIVITY_FILTERS.map((f) => [f.value, f.color]),
);

@customElement('parqet-activities-view')
export class ParqetActivitiesView extends LitElement {
  @property() portfolioId = '';
  @property({ attribute: false }) client!: AnyClient;
  @property({ attribute: false }) config!: ParqetCardConfig;

  @state() private _activities: Activity[] = [];
  @state() private _cursor: string | null = null;
  @state() private _loading = false;
  @state() private _loadingMore = false;
  @state() private _hasMore = false;
  @state() private _filter: ActivityType | 'all' = 'all';
  @state() private _error = '';

  connectedCallback() {
    super.connectedCallback();
    this._filter = (this.config?.default_activity_type as ActivityType) ?? 'all';
    void this._load(true);
  }

  updated(changed: PropertyValues) {
    if (changed.has('portfolioId') && this.portfolioId) {
      this._reset();
      void this._load(true);
    }
  }

  private _reset() {
    this._activities = [];
    this._cursor = null;
    this._hasMore = false;
  }

  private async _load(reset = false) {
    if (!this.portfolioId || !this.client) return;
    if (reset) this._reset();

    if (reset) this._loading = true;
    else this._loadingMore = true;
    this._error = '';

    try {
      const resp = await this.client.getActivities(this.portfolioId, {
        activityType: this._filter !== 'all' ? this._filter : undefined,
        limit: Math.max(10, this.config?.activities_limit ?? 25),
        cursor: reset ? null : this._cursor,
      });

      this._activities = reset
        ? resp.activities
        : [...this._activities, ...resp.activities];
      this._cursor = resp.cursor;
      this._hasMore = !!resp.cursor;
    } catch (e) {
      this._error = e instanceof Error ? e.message : String(e);
    } finally {
      this._loading = false;
      this._loadingMore = false;
    }
  }

  private async _setFilter(f: ActivityType | 'all') {
    this._filter = f;
    await this._load(true);
  }

  private _fmtDate(iso: string): string {
    return new Date(iso).toLocaleDateString(undefined, {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
    });
  }

  private _fmtC(v: number | null | undefined): string {
    if (v == null) return '—';
    const sym = this.config?.currency_symbol ?? '€';
    return `${sym}${v.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
  }

  private _typeLabel(type: string): string {
    return type.replace(/_/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase());
  }

  render() {
    const compact = !!this.config?.compact;

    return html`
      <!-- Filter chips -->
      <div class="filters" role="group" aria-label="Filter activities">
        ${ACTIVITY_FILTERS.map(
          (f) => html`
            <button
              class="chip ${this._filter === f.value ? 'active' : ''}"
              style="--chip-color: ${f.color}"
              @click=${() => this._setFilter(f.value)}
              aria-pressed=${this._filter === f.value}
            >
              ${f.label}
            </button>
          `,
        )}
      </div>

      ${this._error ? html`<div class="error" role="alert">${this._error}</div>` : ''}
      ${this._loading ? html`<parqet-loading-spinner></parqet-loading-spinner>` : ''}

      <div class="list">
        ${this._activities.map((a) => this._renderActivity(a, compact))}
        ${this._activities.length === 0 && !this._loading
          ? html`<div class="empty">No activities found.</div>`
          : ''}
      </div>

      ${this._hasMore
        ? html`
            <div class="load-more">
              <button
                class="load-more-btn"
                @click=${() => this._load(false)}
                ?disabled=${this._loadingMore}
              >
                ${this._loadingMore ? 'Loading…' : 'Load more'}
              </button>
            </div>
          `
        : ''}
    `;
  }

  private _assetLabel(a: Activity): string {
    if (a.asset?.name) return a.asset.name;
    if (a.asset?.symbol) return a.asset.symbol;
    if (a.asset?.isin) return a.asset.isin;
    return `…${a.holdingId.slice(-8)}`;
  }

  private _renderActivity(a: Activity, compact: boolean) {
    const color = TYPE_COLOR[a.type] ?? '#888';
    const hasTaxFee = (a.tax != null && a.tax !== 0) || (a.fee != null && a.fee !== 0);
    return html`
      <div class="activity ${compact ? 'compact' : ''}">
        <span class="badge" style="background: ${color}">${this._typeLabel(a.type)}</span>
        <div class="info">
          <span class="asset">${this._assetLabel(a)}</span>
          <span class="date">
            ${this._fmtDate(a.datetime)}${a.broker
              ? html` · <span class="broker">${a.broker.replace(/_/g, ' ')}</span>`
              : ''}
          </span>
          ${hasTaxFee
            ? html`<span class="taxfee">
                ${a.tax ? `Tax: ${this._fmtC(a.tax)}` : ''}${a.tax && a.fee ? ' · ' : ''}${a.fee ? `Fee: ${this._fmtC(a.fee)}` : ''}
              </span>`
            : ''}
        </div>
        <div class="amounts">
          ${a.shares != null
            ? html`<span class="shares">${a.shares.toLocaleString()} shares</span>`
            : ''}
          <span class="amount">${this._fmtC(a.amount)}</span>
        </div>
      </div>
    `;
  }

  static styles = css`
    :host {
      display: block;
    }
    .filters {
      display: flex;
      flex-wrap: wrap;
      gap: 4px;
      padding: 8px 16px;
    }
    .chip {
      padding: 3px 10px;
      border: 1px solid var(--divider-color, #e0e0e0);
      border-radius: 12px;
      background: none;
      color: var(--secondary-text-color);
      font-size: 0.72rem;
      cursor: pointer;
      transition: all 0.15s;
    }
    .chip.active {
      background: var(--chip-color, var(--primary-color));
      color: white;
      border-color: var(--chip-color, var(--primary-color));
    }
    .chip:hover:not(.active) {
      color: var(--primary-text-color);
      border-color: var(--primary-text-color);
    }
    .chip:focus-visible {
      outline: 2px solid var(--primary-color);
      outline-offset: 1px;
    }
    .list {
      padding: 0 8px;
    }
    .activity {
      display: flex;
      align-items: center;
      gap: 10px;
      padding: 10px 8px;
      border-bottom: 1px solid var(--divider-color, #eee);
    }
    .activity.compact {
      padding: 6px 8px;
    }
    .activity:last-child {
      border-bottom: none;
    }
    .badge {
      min-width: 76px;
      text-align: center;
      padding: 2px 6px;
      border-radius: 10px;
      font-size: 0.68rem;
      font-weight: 600;
      color: white;
      white-space: nowrap;
      flex-shrink: 0;
    }
    .info {
      flex: 1;
      min-width: 0;
    }
    .asset {
      display: block;
      font-size: 0.83rem;
      font-weight: 500;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
    .date {
      display: block;
      font-size: 0.7rem;
      color: var(--secondary-text-color);
    }
    .broker {
      text-transform: capitalize;
    }
    .taxfee {
      display: block;
      font-size: 0.68rem;
      color: var(--secondary-text-color);
    }
    .amounts {
      text-align: right;
      flex-shrink: 0;
    }
    .shares {
      display: block;
      font-size: 0.7rem;
      color: var(--secondary-text-color);
    }
    .amount {
      display: block;
      font-size: 0.83rem;
      font-weight: 600;
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
    .load-more {
      padding: 12px;
      text-align: center;
    }
    .load-more-btn {
      padding: 6px 20px;
      background: none;
      border: 1px solid var(--primary-color, #03a9f4);
      color: var(--primary-color, #03a9f4);
      border-radius: 16px;
      cursor: pointer;
      font-size: 0.875rem;
      transition: all 0.15s;
    }
    .load-more-btn:hover:not(:disabled) {
      background: var(--primary-color, #03a9f4);
      color: white;
    }
    .load-more-btn:disabled {
      opacity: 0.5;
      cursor: not-allowed;
    }
  `;
}

declare global {
  interface HTMLElementTagNameMap {
    'parqet-activities-view': ParqetActivitiesView;
  }
}
