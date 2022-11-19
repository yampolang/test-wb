customElements.define('app-checkbox', class extends HTMLElement {
  constructor() {
    super();
    this.type         = this.hasAttribute("type") &&
                        this.getAttribute("type");
    this.getIsChecked = this.hasAttribute("isChecked") &&
                        this.getAttribute("isChecked") === 'true';
  }


  render() {
    this.innerHTML = `<input type="checkbox" class="${this.typeCheckbox()}">`
  }

  connectedCallback() {
    this.render()
    this.querySelector('input').checked = this.getIsChecked
  }

  typeCheckbox() {
    return this.type === 'black' ? 'wb-checkbox_black' : 'wb-checkbox'
  }
})