import {PaymentInfo} from "../../db/TestData.js";
import {CardImage, CardFormat} from "../../helpers/helpers.js";
import {createLayer} from "../../state/state.js";
import("./Form.js");

customElements.define('basket-payment', class extends HTMLElement {
  render() {
    this.innerHTML = `
      <div class="title__container">
        <h3>Способ оплаты</h3>
        <button class="change-btn">Изменить</button>
      </div>
      <div class="card__container">
        <img src="${CardImage(PaymentInfo[0].payment_system)}" alt="">
        <p>${CardFormat(PaymentInfo[0].card_number)} <span>${PaymentInfo[0].expiration_date.month}/${PaymentInfo[0].expiration_date.year}</span></p>
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