import("../ui/AppButton.js");
import("../ui/AppRadio.js");
import {PaymentInfo} from "../../db/TestData.js";
import {destroyLayer} from "../../state/state.js";
import {CardImage, CardFormat} from "../../helpers/helpers.js";

customElements.define('basket-payment-form', class extends HTMLElement {
  render() {
    this.innerHTML = `
      <div class="basket-payment-form__wrapper">
        <div class="title__container">
          <span>Способ оплаты</span>
          <span class="icon cross-icon"></span>
        </div>
        
        <ul class="my-cards">
          
        </ul>
        
        <app-button>Выбрать</app-button>
      </div>
    `
  }

  connectedCallback() {
    this.render();

    PaymentInfo.forEach(item => {
      this.querySelector('.my-cards').innerHTML +=
        `<li>
          <app-radio 
            id="${item.id}" 
            name="card"
            value="${item.id}"
            checked="${item.id === PaymentInfo[0].card_number}"
          >
          </app-radio>
          <p class="my-cards__card">
            <img src="${CardImage(item.payment_system)}" alt="">
            <span>${CardFormat(item.card_number)}</span>
          </p>
        </li>`
    })

    this.querySelector('.cross-icon').addEventListener('click', () => {
      this.remove()
      destroyLayer()
    })

  }

})