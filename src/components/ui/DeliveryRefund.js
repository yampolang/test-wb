
customElements.define('delivery-refund', class extends HTMLElement {
  connectedCallback() {
    this.innerHTML = `<p>Обратная доставка товаров на склад при отказе — <span>бесплатно</span></p>`
  }
})