/**
 * Copyright 2025 
 * @license Apache-2.0, see LICENSE for full text.
 */
import { LitElement, html, css } from "lit";
import { DDDSuper } from "@haxtheweb/d-d-d/d-d-d.js";
import { I18NMixin } from "@haxtheweb/i18n-manager/lib/I18NMixin.js";

/**
 * `ice-planner`
 * 
 * @demo index.html
 * @element ice-planner
 */
export class IcePlanner extends DDDSuper(I18NMixin(LitElement)) {

  static get tag() {
    return "ice-planner";
  }

  constructor() {
    super();
    this.teamName = "The Seals";
    this.iceHours = 0;
    this.costPerHour = 300;
    this.coachCost = 0;
    this.jerseyCost = 0;
    this.transactionPercent = 2;
    this.transactionFixed = 0.99;
    this.numPlayers = 1;
    this.subtotal = 0;
    this.totalWithFee = 0;
    this.costPerPlayer = 0;
   
  }

  // Lit reactive properties
  static get properties() {
    return {
      teamName: { type: String },
      iceHours: { type: Number },
      costPerHour: { type: Number },
      coachCost: { type: Number },
      jerseyCost: { type: Number },
      transactionPercent: { type: Number },
      transactionFixed: { type: Number },
      numPlayers: { type: Number },
      subtotal: { type: Number },
      totalWithFee: { type: Number },
      costPerPlayer: { type: Number },
    };
  }

  static get styles() {
    return [super.styles,
    css`
   :host {
        display: block;
        padding: 20px;
        box-sizing: border-box;
      }

      .team-card {
        background-color: var(--ddd-theme-background, #fff);
        border-radius: 12px;
        padding: 16px;
        box-shadow: 0 4px 12px rgba(0,0,0,0.08);
        max-width: 520px;
        margin: 0 auto;
        display: flex;
        flex-direction: column;
        gap: 16px;
      }

      .team-header {
        display: flex;
        align-items: center;
        gap: 12px;
        border-bottom: 1px solid rgba(0,0,0,0.1);
        padding-bottom: 8px;
      }

      .team-logo {
        width: 60px;
        height: 60px;
        object-fit: contain;
        border-radius: 50%;
        background-color: white;
        border: 2px solid var(--ddd-theme-primary, #1e90ff);
        flex-shrink: 0;
      }

      .team-name {
        margin: 0;
        font-size: 1.3rem;
        font-weight: bold;
      }

      .cost-row {
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: 12px;
      }

      .label {
        flex: 1;
        font-weight: 600;
      }

      .cost-control {
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 8px;
        flex: 1;
      }

      .cost-control button {
        width: 32px;
        height: 32px;
        font-size: 18px;
        border-radius: 6px;
        border: none;
        background-color: var(--ddd-theme-primary, #1e90ff);
        color: white;
        cursor: pointer;
        display: inline-flex;
        align-items: center;
        justify-content: center;
      }

      .cost-control p {
        margin: 0;
        width: 40px;
        text-align: center;
        font-size: 18px;
      }

      .total {
        flex: 1;
        text-align: right;
        font-weight: bold;
        font-size: 1rem;
      }

      .summary {
        border-top: 1px solid rgba(0,0,0,0.1);
        padding-top: 8px;
        display: flex;
        flex-direction: column;
        gap: 6px;
      }

      .summary-row {
        display: flex;
        justify-content: space-between;
        font-weight: 600;
      }

      .summary-row.total-final {
        border-top: 1px solid rgba(0,0,0,0.2);
        padding-top: 4px;
        font-size: 1.1rem;
        color: var(--ddd-theme-primary, #1e90ff);
      }

      @media (max-width: 480px) {
        .team-header {
          flex-direction: column;
          align-items: center;
          text-align: center;
        }
      }
    `];
  }
//wow
  // Lit render the HTML
  render() {
    return html`
     <div class="team-card">
        <div class="team-header">
          <img
            src="https://assets.pokemon.com/assets/cms2/img/pokedex/full/086.png"

            class="team-logo"
          />
          <h2 class="team-name">${this.teamName}</h2>
        </div>

        <div class="cost-row">
          <span class="label">Ice Hours ($${this.costPerHour}/hr)</span>
          <div class="cost-control">
            <button @click="${() => this.updateValue('iceHours', -1)}">−</button>
            <p>${this.iceHours}</p>
            <button @click="${() => this.updateValue('iceHours', 1)}">+</button>
          </div>
          <p class="total">$${(this.iceHours * this.costPerHour).toFixed(2)}</p>
        </div>

    
        <div class="cost-row">
          <span class="label">Coaches ($3000 each)</span>
          <div class="cost-control">
            <button @click="${() => this.updateValue('coachCost', -3000)}">−</button>
            <p>$${this.coachCost}</p>
            <button @click="${() => this.updateValue('coachCost', 3000)}">+</button>
          </div>
          <p class="total">$${this.coachCost.toFixed(2)}</p>
        </div>


        <div class="cost-row">
          <span class="label">Jerseys ($88 each)</span>
          <div class="cost-control">
            <button @click="${() => this.updateValue('jerseyCost', -88)}">−</button>
            <p>$${this.jerseyCost}</p>
            <button @click="${() => this.updateValue('jerseyCost', 88)}">+</button>
          </div>
          <p class="total">$${this.jerseyCost.toFixed(2)}</p>
        </div>


        <div class="cost-row">
          <span class="label">Players</span>
          <div class="cost-control">
            <button @click="${() => this.updateValue('numPlayers', -1)}">−</button>
            <p>${this.numPlayers}</p>
            <button @click="${() => this.updateValue('numPlayers', 1)}">+</button>
          </div>
          <p class="total">/player</p>
        </div>


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
      </div>
`;
  }
updateValue(field, change) {
  // Prevent negative values or players < 1
  if (field === 'numPlayers' && this.numPlayers + change < 1) return;
  if (this[field] + change < 0) return;

  this[field] += change;
}

  /**
   * haxProperties integration via file reference
   */
  static get haxProperties() {
    return new URL(`./lib/${this.tag}.haxProperties.json`, import.meta.url)
      .href;
  }
}

globalThis.customElements.define(IcePlanner.tag, IcePlanner);