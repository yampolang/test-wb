import ("../ui/AppCheckbox.js");
import {BasketContentItem} from "./BasketContentItem.js";
import {
  changeAmountTaken,
  productsInStock,
  selectedProducts,
  favoritesItemsChanger,
  deleteFromBasket,
  changeSelectedProduct,
  changeSelectedAll,
} from "../../state/state.js";

customElements.define('basket-list', class extends HTMLElement {
  constructor() {
    super();

    this.isVisible = true;
    this.itemId = null;
    this.itemAmountTaken = null;
    this.canPushToFavorites = false;
    this.canFilterList = false;
    this.isSelected = false;
    this.windowWidth = window.innerWidth;
  }

  render() {
    if (productsInStock <= 0) {
      return this.innerHTML = '<p>Товаров нет</p>'
    }

    this.innerHTML = `
      <div class="list-actions">
        <label>
          <app-checkbox value="select-all" isChecked="${productsInStock.length === selectedProducts.length}"></app-checkbox> Выбрать все
        </label>
        <div class="icon">
          <div class="arrow-icon ${this.isVisible ? '' : 'active'}"></div>
        </div>
      </div>
      <div class="list-items ${this.isVisible ? '' : 'hidden'}"></div>
    `

    const listItemsElement = this.querySelector('.list-items')
    productsInStock.forEach(item => listItemsElement.innerHTML += BasketContentItem(item, this.windowWidth))
  }

  connectedCallback() {
    this.render()

    this.addEventListener('click', e => {
      e.composedPath().find(path => {
        if (['basket-item__container-mb', 'basket-item__container-pc'].includes(path.className)) {
          this.itemId = Number(path.getAttribute('data-id'))
        }

        if (path.tagName === 'AMOUNT-INPUT') {
          if (e.target.className === 'input') {
            return false;
          }
          this.itemAmountTaken = Number(path.getAttribute('value'))
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

        if (path.tagName === 'APP-CHECKBOX') {
          if (path.getAttribute('value') === 'select-all') {
           return changeSelectedAll();
          }
          this.isSelected = true
        }
      })

      // после перебора всех путей получаем ID и выполняем помеченное. В MissingList.js аналогично.
      if (this.itemAmountTaken !== null) {
        changeAmountTaken(this.itemId, this.itemAmountTaken)
      }

      if (this.canPushToFavorites) {
        favoritesItemsChanger(this.itemId)
        this.canPushToFavorites = false
      }

      if (this.canFilterList) {
        deleteFromBasket(this.itemId)
        this.canFilterList = false
      }

      if (this.isSelected) {
        changeSelectedProduct(this.itemId)
        this.isSelected = false
      }

    })

    window.addEventListener('resize', e => {
      this.windowWidth = e.target.innerWidth
      this.render()
    })

    this.addEventListener('input', e => {
      e.composedPath().find(path => {
        if (['basket-item__container-mb', 'basket-item__container-pc'].includes(path.className)) {
          this.itemId = Number(path.getAttribute('data-id'))
        }

        if (path.className === 'input') {
          if (e.target.value.length !== 0) {
            changeAmountTaken(this.itemId, Number(e.target.value))
          }
        }
      })
    })

  }

})