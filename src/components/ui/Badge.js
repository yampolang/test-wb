
customElements.define('badge-ui', class extends HTMLElement {
  constructor() {
    super();
    this.counter = this.hasAttribute("counter") &&
                   this.getAttribute("counter");
  }

  render() {
    this.innerHTML = `${this.counter}`
  }

  connectedCallback() {
    return (this.counter > 0) ? this.render() : this.remove()
  }
})