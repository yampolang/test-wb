import("../components/ui/Badge.js");
import("./ui/DeliveryRefund.js");
import {DeliveryInfo} from "../db/TestData.js";

customElements.define('basket-delivery', class extends HTMLElement {
  render() {
    this.innerHTML = `
      <div class="title__container">
        <h3>Способ доставки</h3>
        <a href="#">Изменить</a>
      </div>
      
      <div class="delivery-item">
        <p class="title">Пункт выдачи</p>
        <p class="content">${this.displayAddress(DeliveryInfo.pvz)}</p>
      </div>
      
      <div class="delivery-item">
        <p class="title">Стоимость доставки</p>
        <p class="content">${DeliveryInfo.cost}</p>
      </div>
    `
    DeliveryInfo.date.forEach(item => {this.innerHTML += this.displayDates(item)})

    this.innerHTML += `<delivery-refund></delivery-refund>`
  }

  connectedCallback() {
    this.render()
  }

  displayAddress(pvz) {
    return (`
      ${pvz.city}, улица ${pvz.street}, ${pvz.house}
      <br>
      <span>${pvz.rating} ${pvz.work_hours.days} c ${pvz.work_hours.from} до ${pvz.work_hours.to}</span>
    `)
  }

  displayDates(data) {
    return (`
        <div class="delivery-item">
          <p class="title">${data.date.from.day}-${data.date.to.day} ${data.date.to.month}</p>
          <div class="content-product">${this.displayProducts(data.products)}</div>
        </div>
      `)
  }

  displayProducts(products) {
    let elem = ``
    products.forEach(item => {
      elem += `
        <div class="product__container">
          <img src="${item.img_url_mini}" alt="${item.title}">
          <badge-ui counter="${item.amount}"></badge-ui>
        </div>
      `
    })
    return elem
  }
})