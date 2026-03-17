import { LitElement, html, css, svg } from 'lit';
import { customElement, property } from 'lit/decorators.js';

export interface BarSegment {
  label: string;
  value: number;
  color?: string;
}

const BAR_HEIGHT = 20;
const LABEL_WIDTH = 110;
const VALUE_WIDTH = 80;
const GAP = 4;

@customElement('parqet-bar-chart')
export class ParqetBarChart extends LitElement {
  @property({ type: Array }) segments: BarSegment[] = [];
  @property({ type: String }) currencySymbol = '€';

  private _fmtValue(v: number): string {
    const sym = this.currencySymbol;
    return `${sym}${v.toLocaleString(undefined, { minimumFractionDigits: 0, maximumFractionDigits: 0 })}`;
  }

  render() {
    const items = this.segments.filter((s) => s.value !== 0);
    if (items.length === 0) {
      return html`<div class="empty">No data</div>`;
    }

    const maxAbs = Math.max(...items.map((s) => Math.abs(s.value)));
    const barAreaWidth = 200;
    const totalWidth = LABEL_WIDTH + barAreaWidth + VALUE_WIDTH;
    const totalHeight = items.length * (BAR_HEIGHT + GAP) - GAP;

    return html`
      <div class="chart-container">
        <svg viewBox="0 0 ${totalWidth} ${totalHeight}" class="bars" role="img" aria-label="Performance breakdown chart">
          ${items.map((item, i) => {
            const y = i * (BAR_HEIGHT + GAP);
            const pct = maxAbs > 0 ? Math.abs(item.value) / maxAbs : 0;
            const barWidth = pct * barAreaWidth;
            const positive = item.value >= 0;
            const color = item.color ?? (positive ? 'var(--success-color, #4caf50)' : 'var(--error-color, #f44336)');

            return svg`
              <text x="${LABEL_WIDTH - 8}" y="${y + BAR_HEIGHT / 2}" text-anchor="end" dominant-baseline="central" class="bar-label">
                ${item.label}
              </text>
              <rect x="${LABEL_WIDTH}" y="${y + 2}" width="${barWidth}" height="${BAR_HEIGHT - 4}"
                rx="3" fill="${color}" opacity="0.8">
                <title>${item.label}: ${this._fmtValue(item.value)}</title>
              </rect>
              <text x="${LABEL_WIDTH + barAreaWidth + 8}" y="${y + BAR_HEIGHT / 2}" dominant-baseline="central"
                class="bar-value ${positive ? 'positive' : 'negative'}">
                ${this._fmtValue(item.value)}
              </text>
            `;
          })}
        </svg>
      </div>
    `;
  }

  static styles = css`
    :host { display: block; }
    .chart-container {
      padding: 8px 16px 16px;
      overflow-x: auto;
    }
    .bars {
      width: 100%;
      max-width: 400px;
    }
    .bar-label {
      font-size: 10px;
      fill: var(--secondary-text-color, #757575);
    }
    .bar-value {
      font-size: 10px;
      font-weight: 500;
      font-variant-numeric: tabular-nums;
    }
    .bar-value.positive { fill: var(--success-color, #4caf50); }
    .bar-value.negative { fill: var(--error-color, #f44336); }
    .empty {
      padding: 16px;
      text-align: center;
      color: var(--secondary-text-color);
      font-size: 0.82rem;
    }
  `;
}

declare global {
  interface HTMLElementTagNameMap {
    'parqet-bar-chart': ParqetBarChart;
  }
}
