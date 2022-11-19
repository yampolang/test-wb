import("../ui/Badge.js")
import {productsInStock} from "../../state/state.js";

customElements.define('mobile-menu-item', class extends HTMLElement {
  constructor() {
    super();
    this.classIcon = this.hasAttribute("classIcon") &&
                     this.getAttribute("classIcon");
    this.counter   = this.hasAttribute("counter") &&
                     this.getAttribute("counter");
  }

  render() {
    this.innerHTML = `
      <div class="${this.classIcon}"></div>
    `

    if (this.counter && this.counter > 0) {
      this.innerHTML += `<badge-ui counter="${productsInStock.length}"></badge-ui>`
    }

  }

  connectedCallback() {
    this.render()
  }
})