import("../ui/AppButton.js");
import("../ui/AppRadio.js");
import {MyAddresses} from "../../db/TestData.js";

import {destroyLayer, changeAddress, getAddress} from "../../state/state.js";

customElements.define('basket-delivery-form', class extends HTMLElement {
  constructor() {
    super();
    this.newAddressId = getAddress()
  }

  render() {
    this.innerHTML = `
      <div class="basket-delivery-form__wrapper">
        <div class="title__container">
          <span>Способ доставки</span>
          <span class="icon cross-icon"></span>
        </div>
        
        <div class="way">
          <app-radio 
            type="outlined" 
            id="pvz" 
            name="delivery-way" 
            value="pvz" 
            label="В пункт выдачи" 
            checked="true"
          ></app-radio>
    
          <app-radio 
            type="outlined" 
            id="courier" 
            name="delivery-way" 
            value="courier" 
            label="Курьером" 
          ></app-radio>
        </div>
        
        <ul class="my-address">
          <span>Мои адреса</span>
        </ul>
        
        <app-button>Выбрать</app-button>
      </div>
    `
  }

  connectedCallback() {
    this.render();

    MyAddresses.forEach(item => {

      this.querySelector('.my-address').innerHTML +=
        `<li>
          <app-radio 
            id="${item.id}" 
            name="address"
            value="${item.id}"
            checked="${item.id === getAddress()}"
          >
          </app-radio>
          <p class="my-address__address">${this.displayAddress(item)}</p>
          <div class="icon bci-grey delete-icon"></div>
        </li>`
    })

    let addressInputs = this.querySelectorAll('app-radio[name="address"]')
    addressInputs.forEach(input => {

      input.addEventListener('click', e => {
        if (e.target.value !== this.newAddressId) {
          this.newAddressId = e.target.value
        }
      })

    })

    this.querySelector('.cross-icon').addEventListener('click', () => {
      this.remove()
      destroyLayer()
    })

    this.querySelector('app-button').addEventListener('click', () => {
      changeAddress(this.newAddressId)
      destroyLayer()
    })

  }

  displayAddress(item) {
    if (!item) {
      return (`<p>Адресов нет</p>`)
    }

    let arr = []
    let str = ''

    if (item.hasOwnProperty('city'))          arr.push(`г. ${item.city}`)
    if (item.hasOwnProperty('microdistrict')) arr.push(`микрорайон ${item.microdistrict}`)
    if (item.hasOwnProperty('street'))        arr.push(`улица ${item.street}`)
    if (item.hasOwnProperty('house'))         arr.push(`д. ${item.house}`)

    str = arr.join(', ')

    return (`
      <span>${str}</span>
      <span class="my-address__rating">${!!item.rating && `<span>${item.rating}</span>` || ''} <span>Пункт выдачи</span></span>
    `)
  }

})