import("./elements/TotalItem.js");
import("./ui/DeliveryRefund.js");
import("./ui/WhiteoffCondition.js");
import("./ui/AppButton.js");
import("./ui/AppCheckbox.js");
import {productsInStock, selectedProducts} from "../state/state.js";
import {DeliveryInfo, PaymentInfo} from "../db/TestData.js";
import {
  CardFormat,
  CardImage,
  PriceFormat,
  WordDeclension,
} from "../helpers/helpers.js";

customElements.define('basket-total', class extends HTMLElement {
  constructor() {
    super();

    this.fullPriceSum = 0;
    this.discountSum = 0;
    this.currency = '';
  }

  render() {
    this.innerHTML = `
      <ul>
        <li class="row row-total">
          <span>Итого</span>
          <span>${PriceFormat(this.fullPriceSum - this.discountSum)} ${this.currency}</span>
        </li>
        <li class="row">
          <span>${selectedProducts.length} ${WordDeclension(selectedProducts.length, "товар", "товара", "товаров")}</span>
          <span>${PriceFormat(this.fullPriceSum)} ${this.currency}</span>
        </li>
        <li class="row">
          <span>Скидка</span>
          <span>−${PriceFormat(this.discountSum)} ${this.currency}</span>
        </li>
        <li class="row">
          <span>Доставка</span>
          <span>Бесплатно</span>
        </li>
      </ul>
      
      <total-item title="Доставка в пункт выдачи">
        <p>${DeliveryInfo.pvz.city}, улица ${DeliveryInfo.pvz.street}, ${DeliveryInfo.pvz.house}</p>
        <p class="delivery-dates">5–8 фев</p>
      </total-item>
      
      <delivery-refund></delivery-refund>
      
      <total-item title="Оплата картой">
        <div class="total-card__container">
          <img src="${CardImage(PaymentInfo.payment_system)}" alt="">
          <p>${CardFormat(PaymentInfo.card_number)}</p>
        </div>
      </total-item>
      
      <whiteoff-condition></whiteoff-condition>
      <app-button class="submit">Заказать</app-button>
      <div class="agreement">
        <app-checkbox type="black"></app-checkbox>
        <label>Соглашаюсь <a href="#">с правилами пользования торговой площадкой</a> и <a href="#">возврата</a></label>
      </div>
    `
  }

  connectedCallback() {
    selectedProducts.forEach(id => {
      let prod = productsInStock.filter(item => item.id === id)[0]
      this.fullPriceSum += prod.price * prod.amountTaken
      if (prod.discount_price) {
        this.discountSum += prod.discount_price * prod.amountTaken
      }

      this.currency = prod.currency
    })

    this.render()
  }
})