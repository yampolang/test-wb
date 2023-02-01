
customElements.define('app-radio', class extends HTMLElement {
  constructor() {
    super();
    this.type    = this.hasAttribute('type') &&
                   this.getAttribute('type') || 'basic';
    this.id      = this.hasAttribute('id') &&
                   this.getAttribute('id');
    this.name    = this.hasAttribute('name') &&
                   this.getAttribute('name');
    this.value   = this.hasAttribute('name') &&
                   this.getAttribute('value');
    this.label   = this.hasAttribute('label') &&
                   this.getAttribute('label') || '';
    this.checked = this.hasAttribute('checked') &&
                   (this.getAttribute('checked') === 'true');
  }

  render() {
    this.innerHTML = `
      <input 
        type="radio"
        class="${this.type}"
        id="${this.id}"
        name="${this.name}"
        value="${this.value}"
      >
      <label for="${this.id}">${this.label}</label>
    `
  }

  connectedCallback() {
    this.render();

    this.querySelector(`#${this.id}`).checked = this.checked
  }
})
