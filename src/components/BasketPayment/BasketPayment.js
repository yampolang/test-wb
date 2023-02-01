import {PaymentInfo} from "../../db/TestData.js";
import {CardImage, CardFormat} from "../../helpers/helpers.js";
import {createLayer, getCard} from "../../state/state.js";
import("./Form.js");

customElements.define('basket-payment', class extends HTMLElement {
  constructor() {
    super();
    this.displayedCard = PaymentInfo.find(card => card.id === getCard())
  }


  render() {
    this.innerHTML = `
      <div class="title__container">
        <h3>Способ оплаты</h3>
        <button class="change-btn">Изменить</button>
      </div>
      <div class="card__container">
        <img src="${CardImage(this.displayedCard.payment_system)}" alt="">
        <p>${CardFormat(this.displayedCard.card_number)} <span>${this.displayedCard.expiration_date.month}/${this.displayedCard.expiration_date.year}</span></p>
      </div>
      <p class="card-info">Спишем оплату с карты при получении</p>
    `
  }

  connectedCallback() {
    this.render()

    this.querySelector('.title__container > .change-btn').addEventListener('click', () => {
      this.showForm()
    })

  }

  showForm() {
    createLayer()
    document.getElementById('layer').innerHTML += `<basket-payment-form></basket-payment-form>`
  }
})