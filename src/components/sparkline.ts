import { LitElement, html, css, svg } from 'lit';
import { customElement, property } from 'lit/decorators.js';

const WIDTH = 48;
const HEIGHT = 20;
const PADDING = 2;

@customElement('parqet-sparkline')
export class ParqetSparkline extends LitElement {
  @property({ type: Array }) values: number[] = [];

  render() {
    if (this.values.length < 2) return html``;

    const vals = this.values;
    const min = Math.min(...vals);
    const max = Math.max(...vals);
    const range = max - min || 1;

    const drawW = WIDTH - PADDING * 2;
    const drawH = HEIGHT - PADDING * 2;

    const points = vals
      .map((v, i) => {
        const x = PADDING + (i / (vals.length - 1)) * drawW;
        const y = PADDING + drawH - ((v - min) / range) * drawH;
        return `${x.toFixed(1)},${y.toFixed(1)}`;
      })
      .join(' ');

    const trending = vals[vals.length - 1] >= vals[0];
    const color = trending
      ? 'var(--success-color, #4caf50)'
      : 'var(--error-color, #f44336)';

    return html`
      <svg viewBox="0 0 ${WIDTH} ${HEIGHT}" class="spark" role="img" aria-label="Trend sparkline">
        ${svg`
          <polyline
            points="${points}"
            fill="none"
            stroke="${color}"
            stroke-width="1.5"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        `}
      </svg>
    `;
  }

  static styles = css`
    :host { display: inline-block; vertical-align: middle; }
    .spark {
      width: 48px;
      height: 20px;
    }
  `;
}

declare global {
  interface HTMLElementTagNameMap {
    'parqet-sparkline': ParqetSparkline;
  }
}
