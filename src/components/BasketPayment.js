import {PaymentInfo} from "../db/TestData.js";
import {CardImage, CardFormat} from "../helpers/helpers.js";

customElements.define('basket-payment', class extends HTMLElement {
  render() {
    this.innerHTML = `
      <div class="title__container">
        <h3>Способ оплаты</h3>
        <a href="#">Изменить</a>
      </div>
      <div class="card__container">
        <img src="${CardImage(PaymentInfo.payment_system)}" alt="">
        <p>${CardFormat(PaymentInfo.card_number)} <span>${PaymentInfo.expiration_date.month}/${PaymentInfo.expiration_date.year}</span></p>
      </div>
      <p class="card-info">Спишем оплату с карты при получении</p>
    `
  }

  connectedCallback() {
    this.render()
  }
})