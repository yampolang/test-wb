import("../ui/AppButton.js");
import("../ui/AppRadio.js");
import {PaymentInfo} from "../../db/TestData.js";
import {destroyLayer, changeCard} from "../../state/state.js";
import {CardImage, CardFormat} from "../../helpers/helpers.js";
import {LSActions} from "../../localStorage/localStorageRepository.js";

customElements.define('basket-payment-form', class extends HTMLElement {
  constructor() {
    super();
    this.newCardId = LSActions.selectedCard.get()
  }


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
            checked="${item.id === LSActions.selectedCard.get()}"
          >
          </app-radio>
          <p class="my-cards__card">
            <img src="${CardImage(item.payment_system)}" alt="">
            <span>${CardFormat(item.card_number)}</span>
          </p>
        </li>`
    })

    let cardInput = this.querySelectorAll('app-radio[name="card"]')
    cardInput.forEach(input => {
      input.addEventListener('click', e => {
        if (e.target.value !== this.newCardId) {
          this.newCardId = e.target.value
        }
      })
    })

    this.querySelector('app-button').addEventListener('click', () => {
      changeCard(this.newCardId)
      destroyLayer()
    })

    this.querySelector('.cross-icon').addEventListener('click', () => {
      this.remove()
      destroyLayer()
    })

  }

})