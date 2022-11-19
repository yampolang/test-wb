import("../components/elements/MobileMenuItem.js");
import {productsInStock} from "../state/state.js";

customElements.define('mobile-menu', class extends HTMLElement {
  render() {
    this.innerHTML = `
      <mobile-menu-item classIcon="bmi home-icon"></mobile-menu-item>
      <mobile-menu-item classIcon="bmi bm-search-icon"></mobile-menu-item>
      <mobile-menu-item classIcon="bmi cart-icon bmi-active" counter="${productsInStock.length}"></mobile-menu-item>
      <mobile-menu-item classIcon="bmi heart-icon"></mobile-menu-item>
      <mobile-menu-item classIcon="bmi profile-icon"></mobile-menu-item>
    `
  }

  connectedCallback() {
    this.render()
  }
})