import {createLayer} from "../../state/state.js";

import("../BasketDelivery/Form.js")
import("../BasketPayment/Form.js")


customElements.define('total-item', class extends HTMLElement {
  constructor() {
    super();
    this.title = this.getAttribute('title');
    this.inner = this.innerHTML;
    this.id = this.getAttribute('type');
  }


  render() {
    this.innerHTML = `
      <div class="total-title__container">
        <h4>${this.title}</h4>
        <div class="icon pencil-icon" id="${this.id}"></div>
      </div>
    `
    this.innerHTML += this.inner
  }

  connectedCallback() {

    this.render();

    this.querySelector('.pencil-icon').addEventListener('click', e => {
      createLayer()

      if (e.target.id === 'change-address') {
        document.getElementById('layer').innerHTML += `<basket-delivery-form></basket-delivery-form>`
      }

      if (e.target.id === 'change-card') {
        document.getElementById('layer').innerHTML += `<basket-payment-form></basket-payment-form>`
      }
    })
  }
})