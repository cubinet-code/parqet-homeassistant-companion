import { LitElement, html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { PARQET_ICON_URL } from '../const';

@customElement('parqet-auth-prompt')
export class ParqetAuthPrompt extends LitElement {
  @property({ type: Boolean }) loading = false;
  @property() error = '';

  private _handleConnect() {
    this.dispatchEvent(new CustomEvent('connect', { bubbles: true, composed: true }));
  }

  render() {
    return html`
      <div class="container">
        <img class="brand-icon" src="${PARQET_ICON_URL}" alt="Parqet" width="64" height="64" />
        <h3 class="title">Parqet Home Assistant Companion</h3>
        <p class="subtitle">
          Connect your Parqet account to display portfolio data in your Home Assistant dashboard.
        </p>

        ${this.error
          ? html`<div class="error-box" role="alert">${this.error}</div>`
          : ''}

        <button
          class="connect-btn"
          @click=${this._handleConnect}
          ?disabled=${this.loading}
          aria-label="Connect with Parqet"
        >
          ${this.loading
            ? html`<span class="spinner"></span> Connecting…`
            : html`
                <img
                  src="${PARQET_ICON_URL}"
                  alt=""
                  aria-hidden="true"
                  class="btn-icon"
                  width="20"
                  height="20"
                />
                Connect with Parqet
              `}
        </button>
      </div>
    `;
  }

  static styles = css`
    .container {
      display: flex;
      flex-direction: column;
      align-items: center;
      padding: 32px 24px;
      gap: 12px;
      text-align: center;
    }
    .brand-icon {
      border-radius: 12px;
    }
    .title {
      margin: 0;
      font-size: 1.1rem;
      font-weight: 600;
      color: var(--primary-text-color);
    }
    .subtitle {
      margin: 0;
      color: var(--secondary-text-color);
      font-size: 0.875rem;
      max-width: 300px;
      line-height: 1.5;
    }
    .error-box {
      background: var(--error-color, #f44336);
      color: white;
      border-radius: 6px;
      padding: 8px 14px;
      font-size: 0.8rem;
      max-width: 300px;
    }
    .connect-btn {
      display: inline-flex;
      align-items: center;
      gap: 8px;
      background-color: #009991;
      color: white;
      border: none;
      border-radius: 6px;
      padding: 10px 20px;
      font-size: 0.9rem;
      font-weight: 600;
      cursor: pointer;
      transition: background-color 0.2s;
      margin-top: 4px;
    }
    .connect-btn:hover:not(:disabled) {
      background-color: #5bcec2;
    }
    .connect-btn:focus-visible {
      outline: 2px solid #009991;
      outline-offset: 2px;
    }
    .connect-btn:disabled {
      opacity: 0.7;
      cursor: not-allowed;
    }
    .btn-icon {
      border-radius: 50%;
    }
    .spinner {
      display: inline-block;
      width: 14px;
      height: 14px;
      border: 2px solid rgba(255, 255, 255, 0.4);
      border-top-color: white;
      border-radius: 50%;
      animation: spin 0.7s linear infinite;
    }
    @keyframes spin {
      to {
        transform: rotate(360deg);
      }
    }
  `;
}

declare global {
  interface HTMLElementTagNameMap {
    'parqet-auth-prompt': ParqetAuthPrompt;
  }
}
