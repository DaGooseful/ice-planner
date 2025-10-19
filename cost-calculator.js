import { LitElement, html, css } from "lit";

export class CostCalculator extends LitElement {
  static get tag() {
    return "cost-calculator";
  }

  static get properties() {
    return {
      iceHours: { type: Number },
      costPerHour: { type: Number },
      coachCost: { type: Number },
      jerseyCost: { type: Number },
      transactionPercent: { type: Number },
      transactionFixed: { type: Number },
      numPlayers: { type: Number }
    };
  }

  constructor() {
    super();
    this.iceHours = 0;
    this.costPerHour = 300;
    this.coachCost = 0;
    this.jerseyCost = 0;
    this.transactionPercent = 2;
    this.transactionFixed = 0.99;
    this.numPlayers = 1;
  }

  get subtotal() {
    return this.iceHours * this.costPerHour + this.coachCost + this.jerseyCost;
  }

  get totalWithFee() {
    const fee = this.subtotal * (this.transactionPercent / 100) + this.transactionFixed;
    return this.subtotal + fee;
  }

  get costPerPlayer() {
    return this.numPlayers > 0 ? this.totalWithFee / this.numPlayers : 0;
  }

  static get styles() {
    return css`
      :host {
        display: block;
        background-color: var(--card-bg, #fff);
        color: #4fc3f7;
        border-radius: 12px;
        padding: 16px;
        transition: background-color 0.3s ease, color 0.3s ease;
      }
      h3 {
        margin-top: 0;
        color: #4fc3f7;
      }
      .summary-row {
        display: flex;
        justify-content: space-between;
        margin: 6px 0;
        color: #4fc3f7;
      }
      .total-final {
        font-weight: bold;
        color: #4fc3f7;
      }
    `;
  }

  render() {
    return html`
      <div class="summary">
        <div class="summary-row">
          <span>Subtotal:</span>
          <span>$${this.subtotal.toFixed(2)}</span>
        </div>
        <div class="summary-row">
          <span>Transaction Fee:</span>
          <span>$${(this.totalWithFee - this.subtotal).toFixed(2)}</span>
        </div>
        <div class="summary-row total-final">
          <span>Cost per Player:</span>
          <span>$${this.costPerPlayer.toFixed(2)}</span>
        </div>
      </div>
    `;
  }
}

customElements.define(CostCalculator.tag, CostCalculator);