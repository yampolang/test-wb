import("../components/ui/Badge.js");
import {productsInStock} from "../state/state.js";

customElements.define('app-navbar', class extends HTMLElement {

  render() {
    this.innerHTML = `
      <header>
        <div class="header-mb">
          <div class="icon menu-mb-icon"></div>
          <span class="header-title">товары и точка</span>
          <div class="icon search-icon"></div>
        </div>
        
        <div class="header-pc">
          <div class="icon menu-pc-icon__container">
            <div class="menu-pc-icon"></div>
          </div>
          
          <a href="#" class="header-title">товары<br>и точка</a>
          
          <div class="header-input__container">
            <input class="header-input" placeholder="Я ищу...">
            <div class="icon search-mask__container">
                <button class="icon search-mask"></button>
            </div>
          </div>
          
          <a href="#" class="icon__container">
            <div class="icon profile-icon"></div>
            <span>Профиль</span>
          </a>
          
          <a href="#" class="icon__container cart">
            <div class="icon cart-icon"></div>
            <badge-ui counter="${productsInStock.length}"></badge-ui>
        
            <span>Корзина</span>
          </a>
        </div>
      </header>
`
  }
  connectedCallback() {
    this.render()
  }
})