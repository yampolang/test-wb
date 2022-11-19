import("./elements/BasketContent.js");
import("./BasketDelivery.js");
import("./BasketPayment.js");
import("./BasketRecipient.js");
import("./BasketTotal.js");

customElements.define('basket-page', class extends HTMLElement {
  connectedCallback() {
    this.innerHTML = `
      <section class="main">
        <basket-content></basket-content>
        <basket-delivery></basket-delivery>
        <basket-payment></basket-payment>
        <basket-recipient></basket-recipient>
      </section>
      <basket-total></basket-total>
    `
  }
})