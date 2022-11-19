
customElements.define('total-item', class extends HTMLElement {
  constructor() {
    super();
    this.title = this.getAttribute('title');
    this.inner = this.innerHTML;
  }


  render() {
    this.innerHTML = `
      <div class="total-title__container">
        <h4>${this.title}</h4>
        <div class="icon pencil-icon"></div>
      </div>
    `
    this.innerHTML += this.inner
  }

  connectedCallback() {
    this.render();
  }
})