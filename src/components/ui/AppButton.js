
customElements.define('app-button', class extends HTMLElement {
  connectedCallback() {
    this.innerHTML = `<button>${this.innerText}</button>`
  }
})