import("./components/Navbar.js");
import("./components/Basket.js");
import("./components/Footer.js");
import("./components/MobileMenu.js");

const root = document.getElementById('root')
root.innerHTML = `
  <app-navbar></app-navbar>
  <basket-page></basket-page>
  <app-footer></app-footer>
  <mobile-menu></mobile-menu>
`