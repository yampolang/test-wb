import("../ui/AmountInput.js");
import("../ui/AppCheckbox.js");
import {PriceFormat} from "../../helpers/helpers.js";
import {favoritesItems, selectedProducts} from "../../state/state.js";

const itemChars = chars => {
  if (!chars) {return}
  let result = ''
  chars.forEach(item => {
    result += `<span>${Object.keys(item)}: ${Object.values(item)}</span>`
  })
  return result
}

export const BasketContentItem = (product, winWidth) => {
  const displayPrice = (price, discount_price) => {
    if (discount_price) {
      return `
        <span class="price">${PriceFormat(product.discount_price * product.amountTaken)} <span class="item-currency">${product.currency}</span></span>
        <span class="old-price">${PriceFormat(product.price * product.amountTaken)} ${product.currency}</span>
      `
    }

    return `<span class="price">${PriceFormat(product.price * product.amountTaken)} <span class="item-currency">${product.currency}</span></span>`
  }

  let mobileVer = `
    <div class="basket-item__container-mb" data-id="${product.id}">
      <div class="item-info">
        <div class="image__container">
          <app-checkbox isChecked="${selectedProducts.includes(product.id)}"></app-checkbox>
          <img src="${product.img_url}" alt="${product.title}">
        </div>
        
        <div class="info-text">
          <p>${displayPrice(product.price, product.discount_price)}</p>
          <p class="item-title">${product.title}</p>
          <p class="item-characteristics">${itemChars(product.characteristics)}</p>
          <p class="item-pvz">${product.pvz}</p>
        </div>
      </div>
      
      <div class="item-actions">
        <div class="amount__container">
          <amount-input value="${product.amountTaken}" maxAmount="${product.amount}"></amount-input>
          ${product.amount - product.amountTaken <= 10 ? `<p class="amount__container__text">Осталось: ${product.amount - product.amountTaken} шт.</p>` : ''}
        </div>
          
        <div>
          <div class="icon bci favorites-icon ${favoritesItems.includes(product.id) ? 'icon-active' : ''}"></div>
          <div class="icon bci delete-icon"></div>
        </div>
      </div>
    </div>
  `

  let pcVer = `
    <div class="basket-item__container-pc" data-id="${product.id}">
      <div>
        <div class="info-text">
          <div class="image__container">
            <app-checkbox isChecked="${selectedProducts.includes(product.id)}"></app-checkbox>
            <img src="${product.img_url}" alt="${product.title}">
          </div>
  
          <div>
            <p class="item-title">${product.title}</p>
            <p class="item-characteristics">${itemChars(product.characteristics)}</p>
            <p class="item-pvz">${product.pvz}</p>
            <p class="item-seller">${product.seller}</p>
          </div>
        </div>
        
        <div class="item-actions">
          <amount-input value="${product.amountTaken}" maxAmount="${product.amount}"></amount-input>
          ${product.amount - product.amountTaken <= 10 ? `<p class="amount__container__text">Осталось: ${product.amount - product.amountTaken} шт.</p>` : ''}
          <div>
            <div class="icon bci favorites-icon ${favoritesItems.includes(product.id) ? 'icon-active' : ''}"></div>
            <div class="icon bci delete-icon"></div>
          </div>
        </div>
      </div>
      
      <p>${displayPrice(product.price, product.discount_price)}</p>
    </div>
  `

  return winWidth < 1024 ? mobileVer : pcVer
}

export const BasketContentMissingItem = (product, winWidth) => {

  let mobileVer = `
    <div class="basket-item__container-mb missing" data-id="${product.id}">
      <div class="item-info">
        <div class="image__container">
          <img src="${product.img_url}" alt="${product.title}">
        </div>
        
        <div class="info-text">
          <p class="item-title">${product.title}</p>
          <p class="item-characteristics">${itemChars(product.characteristics)}</p>
          <p class="item-pvz">${product.pvz}</p>
        </div>
      </div>
      
      <div class="item-actions">
        <div>
          <div class="icon bci favorites-icon ${favoritesItems.includes(product.id) ? 'icon-active' : ''}"></div>
          <div class="icon bci delete-icon"></div>
        </div>
      </div>
    </div>
  `

  let pcVer = `
    <div class="basket-item__container-pc missing" data-id="${product.id}">
      <div>
        <div class="info-text">
        <div class="image__container">
          <img src="${product.img_url}" alt="${product.title}">
        </div>
          <div>
            <p class="item-title">${product.title}</p>
            <p class="item-characteristics">${itemChars(product.characteristics)}</p>
          </div>
        </div>
        
        <div class="item-actions">
          <div>
            <div class="icon bci favorites-icon ${favoritesItems.includes(product.id) ? 'icon-active' : ''}"></div>
            <div class="icon bci delete-icon"></div>
          </div>
        </div>
      </div>
    </div>
  `

  return winWidth < 1024 ? mobileVer : pcVer
}