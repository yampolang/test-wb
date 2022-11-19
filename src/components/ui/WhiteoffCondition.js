import("./AppCheckbox.js");

customElements.define('whiteoff-condition', class extends HTMLElement {
  connectedCallback() {
    this.innerHTML = `
      <div>
        <app-checkbox></app-checkbox>
        <label>Списать оплату сразу</label>
      </div>
      <p>Спишем оплату с карты при получении</p>
    `
  }
})