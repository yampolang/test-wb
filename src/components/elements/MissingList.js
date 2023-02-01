import {BasketContentMissingItem} from "./BasketContentItem.js";
import {
  favoritesItemsChanger,
  deleteFromBasket,
  missingProducts,
} from "../../state/state.js";
import {WordDeclension} from "../../helpers/helpers.js"

customElements.define('missing-list', class extends HTMLElement {
  constructor() {
    super();

    this.isVisible = true;
    this.itemId = null;
    this.canPushToFavorites = false;
    this.canFilterList = false;
    this.windowWidth = window.innerWidth;
  }

  render() {
    if (missingProducts.length <= 0) {
      return this.innerHTML = ''
    }

    this.innerHTML = `
      <div class="list-actions missing-actions">
        <p>Отсутствуют &#183; ${missingProducts.length} ${WordDeclension(missingProducts.length, 'товар', 'товара', 'товаров')}</p>
        <div class="icon">        
          <div class="arrow-icon ${this.isVisible ? '' : 'active'}"></div>
        </div>
      </div>
      <div class="list-items ${this.isVisible ? '' : 'hidden'}"></div>
    `
    missingProducts.forEach(item => this.querySelector('.list-items').innerHTML += BasketContentMissingItem(item, this.windowWidth))
  }

  connectedCallback() {
    this.render()

    this.addEventListener('click', e => {
      e.composedPath().find(path => {
        if (['basket-item__container-mb missing', 'basket-item__container-pc missing'].includes(path.className)) {
          this.itemId = Number(path.getAttribute('data-id'))
        }

        if (path.className !== undefined && path.className.includes('favorites-icon')) {
          this.canPushToFavorites = true
        }

        if (path.className !== undefined && path.className.includes('delete-icon')) {
          this.canFilterList = true
        }

        if (path.className === 'icon') {
          this.isVisible = !this.isVisible
          this.render()
        }
      })

      if (this.canPushToFavorites) {
        favoritesItemsChanger(this.itemId)
        this.canPushToFavorites = false
      }

      if (this.canFilterList) {
        deleteFromBasket(this.itemId)
        this.canFilterList = false
      }

    })

    window.addEventListener('resize', e => {
      this.windowWidth = e.target.innerWidth
      this.render()
    })

  }

})