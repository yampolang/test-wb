customElements.define('amount-input', class extends HTMLElement {
  constructor() {
    super();

    this.min = 1;
    this.value     = this.hasAttribute("value") &&
                     Number(this.getAttribute("value"));
    this.maxAmount = this.hasAttribute("maxAmount") &&
                     this.getAttribute('maxAmount');
  }

  render() {
    this.innerHTML = `
      <button class="minus">-</button>
      <input type="text" value="${this.value}" class="input" size="${this.value.toString().length}">
      <button class="plus">+</button>
    `
  }

  connectedCallback() {
    this.render()
    this.setDisabled()

    // this.querySelector('.minus').addEventListener('click', () => {
    //   this.setAmount(this.value - 1)
    // })
    // this.querySelector('.plus').addEventListener('click', (e) => {
    //   console.log('e +', e)
    //   this.setAmount(this.value + 1)
    // })

    this.addEventListener('click', e => {
      if (e.target.className === 'minus') this.setAmount(this.value - 1)
      if (e.target.className === 'plus') this.setAmount(this.value + 1)
    })

    this.querySelector('.input').addEventListener('input', e => {
      if(!isNaN(Number(e.target.value))) {
        this.setAmount(Number(e.target.value))
      }

      this.setCursorEnd()
    })

  }

  setAmount(newValue) {
    if (newValue === 0) {
      this.value = ''
    }

    if (newValue < this.min || this.maxAmount < newValue) {
      return false
    }

    this.value = newValue

    this.setAttribute('value', this.value.toString())
    this.connectedCallback()
  }

  setDisabled() {
    if (this.value <= this.min) {
      this.querySelector('.minus').disabled = true
    }

    if (this.maxAmount <= this.value) {
      this.querySelector('.plus').disabled = true
    }
  }

  setCursorEnd() {
    this.querySelector('.input').focus()
    this.querySelector('.input').value = ''
    this.querySelector('.input').value = this.value
  }
})