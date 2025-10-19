import { LitElement, html, css } from "lit";
import { DDDSuper } from "@haxtheweb/d-d-d/d-d-d.js";
import { I18NMixin } from "@haxtheweb/i18n-manager/lib/I18NMixin.js";

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
    return [
      super.styles,
      css`
        :host {
          display: block;
          background-color: var(--card-bg, #fff);
          color: #4fc3f7;
          border-radius: 12px;
          padding: 16px;
          box-sizing: border-box;
          transition: background-color 0.3s ease, color 0.3s ease;
          width: 100%;
        }

        .team-card {
          display: flex;
          flex-direction: column;
          gap: 16px;
        }

        .team-header {
          display: flex;
          align-items: center;
          gap: 12px;
          border-bottom: 1px solid var(--border-color, #ccc);
          padding-bottom: 8px;
        }

        .team-logo {
          width: 60px;
          height: 60px;
          object-fit: contain;
          border-radius: 50%;
          border: 2px solid var(--accent-color, #0078d7);
          background-color: white;
        }

        .team-name {
          margin: 0;
          font-size: 1.3rem;
          font-weight: bold;
          color: #4fc3f7;
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
          color: #4fc3f7;
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
          background-color: var(--accent-color, #0078d7);
          color: #fff;
          cursor: pointer;
        }

        .cost-control input {
          width: 60px;
          text-align: center;
          font-size: 16px;
          border: 1px solid var(--border-color, #ccc);
          border-radius: 6px;
          height: 32px;
          background-color: var(--bg-color, #fff);
          color: #4fc3f7;
        }

        .total {
          flex: 1;
          text-align: right;
          font-weight: bold;
          color: #4fc3f7;
        }

        @media (max-width: 600px) {
          .team-header {
            flex-direction: column;
            align-items: center;
            text-align: center;
          }
        }
      `,
    ];
  }

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
            <input
              type="number"
              min="0"
              .value="${this.iceHours}"
              @input="${(e) => this.updateManual('iceHours', e)}"
            />
            <button @click="${() => this.updateValue('iceHours', 1)}">+</button>
          </div>
          <p class="total">$${(this.iceHours * this.costPerHour).toFixed(2)}</p>
        </div>

        <div class="cost-row">
          <span class="label">Coaches ($3000 each)</span>
          <div class="cost-control">
            <button @click="${() => this.updateValue('coachCost', -3000)}">−</button>
            <input
              type="number"
              min="0"
              .value="${this.coachCost / 3000}"
              @input="${(e) => this.updateManual('coachCost', e, 3000)}"
            />
            <button @click="${() => this.updateValue('coachCost', 3000)}">+</button>
          </div>
          <p class="total">$${this.coachCost.toFixed(2)}</p>
        </div>

        <div class="cost-row">
          <span class="label">Jerseys ($88 each)</span>
          <div class="cost-control">
            <button @click="${() => this.updateValue('jerseyCost', -88)}">−</button>
            <input
              type="number"
              min="0"
              .value="${this.jerseyCost / 88}"
              @input="${(e) => this.updateManual('jerseyCost', e, 88)}"
            />
            <button @click="${() => this.updateValue('jerseyCost', 88)}">+</button>
          </div>
          <p class="total">$${this.jerseyCost.toFixed(2)}</p>
        </div>

        <div class="cost-row">
          <span class="label">Transaction Fee (%)</span>
          <div class="cost-control">
            <button @click="${() => this.updateValue('transactionPercent', -1)}">−</button>
            <input
              type="number"
              min="0"
              .value="${this.transactionPercent}"
              @input="${(e) => this.updateManual('transactionPercent', e)}"
            />
            <button @click="${() => this.updateValue('transactionPercent', 1)}">+</button>
          </div>
          <p class="total">+ $${this.transactionFixed.toFixed(2)}</p>
        </div>

        <div class="cost-row">
          <span class="label">Players</span>
          <div class="cost-control">
            <button @click="${() => this.updateValue('numPlayers', -1)}">−</button>
            <input
              type="number"
              min="1"
              .value="${this.numPlayers}"
              @input="${(e) => this.updateManual('numPlayers', e)}"
            />
            <button @click="${() => this.updateValue('numPlayers', 1)}">+</button>
          </div>
          <p class="total">/player</p>
        </div>

        <cost-calculator
          .iceHours="${this.iceHours}"
          .costPerHour="${this.costPerHour}"
          .coachCost="${this.coachCost}"
          .jerseyCost="${this.jerseyCost}"
          .transactionPercent="${this.transactionPercent}"
          .transactionFixed="${this.transactionFixed}"
          .numPlayers="${this.numPlayers}"
        ></cost-calculator>
      </div>
    `;
  }

  updateValue(field, change) {
    if (field === 'numPlayers' && this.numPlayers + change < 1) return;
    if (this[field] + change < 0) return;
    this[field] += change;
  }

  updateManual(field, e, multiplier = 1) {
    let newValue = Number(e.target.value);
    if (!isNaN(newValue) && newValue >= 0) {
      if (field === 'coachCost' || field === 'jerseyCost') {
        this[field] = newValue * multiplier;
      } else {
        this[field] = newValue;
      }
      this.requestUpdate();
      this.dispatchEvent(new CustomEvent('change', { bubbles: true, composed: true }));
    }
  }

  handleTotals(e) {
    this.subtotal = e.detail.subtotal;
    this.totalWithFee = e.detail.totalWithFee;
    this.costPerPlayer = e.detail.costPerPlayer;
  }

  static get haxProperties() {
    return new URL(`./lib/${this.tag}.haxProperties.json`, import.meta.url).href;
  }
}

globalThis.customElements.define(IcePlanner.tag, IcePlanner);


//What we need for our calculations
// Ice hours (how many hour of ice you need)
// Cost per hour (Cost of ice for each hour)
// Coach cost (Cost of the coach)
// Jersey cost (Cost of jersey for a player, not total && Can't go below number of players)
// Transaction percent (Percentage of the total cost added as a fee)
// Number of players (Number of players on the team)

//Our total calculations to show
// Subtotal (Total cost before fees)
// Total with fee (Total cost after adding fees)
// Total cost with everything (Subtotal plus transaction fees)
// Cost per player (Total cost divided by number of players)

//Last but not least
//We need input for each of the above that updates the values and calculations
//Aka not only will we have a button, the user can type in a number directly as well
