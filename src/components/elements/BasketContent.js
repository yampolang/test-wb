import('./BasketList.js');
import('./MissingList.js');

customElements.define('basket-content', class extends HTMLElement {
  connectedCallback() {
    this.innerHTML = `
      <h2 class="title">Корзина</h2>
      <basket-list></basket-list>
      <missing-list></missing-list>
    `
  }
})