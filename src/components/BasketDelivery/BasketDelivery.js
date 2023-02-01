import {LSActions} from "../../localStorage/localStorageRepository.js";

import("./Form.js");
import("../../components/ui/Badge.js");
import("../ui/DeliveryRefund.js");
import {DeliveryInfo, MyAddresses} from "../../db/TestData.js";

import {createLayer} from "../../state/state.js";

customElements.define('basket-delivery', class extends HTMLElement {
  render() {
    this.innerHTML = `
      <div class="title__container">
        <h3>Способ доставки</h3>
        <button class="change-btn">Изменить</button>
      </div>
      
      <div class="delivery-item">
        <p class="title">Пункт выдачи</p>
        <p class="content">${this.displayAddress(MyAddresses.find(addr => addr.id === LSActions.selectedAddress.get()) )}</p>
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
    if (LSActions.selectedAddress.get() === null) {
      LSActions.selectedAddress.set(MyAddresses[0].id)
    }

    this.render()

    this.querySelector('.title__container > .change-btn').addEventListener('click', () => {
      this.showForm();
    })
  }

  showForm() {
    createLayer()
    document.getElementById('layer').innerHTML += `<basket-delivery-form></basket-delivery-form>`
  }

  displayAddress(pvz) {
    return (`
      ${pvz.city}, улица ${pvz.street}, ${pvz.house}
      <br>
      <span class="my-address__rating">${pvz.rating ? pvz.rating : ''} ${pvz.work_hours.days} с ${pvz.work_hours.from} до ${pvz.work_hours.to}</span>
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