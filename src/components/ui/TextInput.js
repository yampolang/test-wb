customElements.define('text-input', class extends HTMLElement {
  constructor() {
    super();

    this.idText    = this.hasAttribute("idText") &&
                     this.getAttribute("idText");
    this.value     = this.hasAttribute("value") &&
                     this.getAttribute("value") || '';
    this.label     = this.hasAttribute("label") &&
                     this.getAttribute("label") || '';
    this.remark    = this.hasAttribute("remark") &&
                     this.getAttribute("remark") || '';
    this.errors    = this.hasAttribute("errors") &&
                     this.getAttribute("errors");
    this.type      = this.hasAttribute("type") &&
                     this.getAttribute("type") || 'text';
    this.maxLength = this.hasAttribute("maxLength") &&
                     this.getAttribute("maxLength");

    this.phoneMaskingByEvent = function (e) {
      // маска не моя, лишь немного переделала, источник - https://github.com/alexey-goloburdin/phoneinput/blob/main/phoneinput.js
      let input = e.target,
          inputNumbersValue = input.value.replace(/\D/g, ''),
          firstSymbols = '',
          formattedInputValue = "";

      if (["7", "8", "9"].includes(inputNumbersValue[0])) {
        if (inputNumbersValue[0] === "9") inputNumbersValue = "7" + inputNumbersValue;

        firstSymbols = (inputNumbersValue[0] === "8") ? "8" : "+7";
        formattedInputValue = firstSymbols + " "

        if (inputNumbersValue.length > 1) {
          formattedInputValue += inputNumbersValue.substring(1, 4);
        }

        if (inputNumbersValue.length >= 5) {
          formattedInputValue += ' ' + inputNumbersValue.substring(4, 7);
        }

        if (inputNumbersValue.length >= 8) {
          formattedInputValue += ' ' + inputNumbersValue.substring(7, 9);
        }

        if (inputNumbersValue.length >= 10) {
          formattedInputValue += ' ' + inputNumbersValue.substring(9, 11);
        }

      } else {
        formattedInputValue = '+' + inputNumbersValue.substring(0, 16);
      }


      if (e.inputType === 'deleteContentBackward' && input.value.replace(' ', '') === firstSymbols) {
        return input.value += ''
      }

      input.value = formattedInputValue;
    }
  }

  render() {
    this.innerHTML = `
      <div class="input__container ${this.errors ? 'has-errors' : ''}">
        <input 
          id="${this.idText}" 
          placeholder=" " 
          type="${this.type}"
          maxlength="${this.maxLength}"
        />
        <label for="${this.idText}">${this.label}</label>
      </div>
      <p class="remark">${this.remark}</p>
    `

    if (this.errors) {
      this.errors = this.errors.split(';')
      let errorsList = document.createElement('ol')
      errorsList.className = 'errors-list'

      this.errors.forEach(err => {
        errorsList.innerHTML = `<li>${err}</li>`
      })

      if (!this.remark) {
        let remarkElement = this.querySelector('.remark')
        remarkElement.replaceWith(errorsList)
      } else {
        this.append(errorsList)
      }
    }
  }

  connectedCallback() {
    this.render()

    this.type === 'phone-masked' ? this.querySelector('input').value = this.phoneMaskingRender(this.value) :
      this.querySelector('input').value = this.value

    if (['num', 'phone', 'phone-masked'].includes(this.type)) {
      this.addEventListener('keydown', e => {
        if (/\D/g.test(e.key) && e.key !== 'Backspace') {
          e.preventDefault()
        }
      })

      if (this.type === 'phone-masked') {
        this.addEventListener('input', this.phoneMaskingByEvent, false)
      }
    }

  }

  phoneMaskingRender(phone) {
    if (phone === '') {
      return phone
    }

    let formattedInputValue = '';

    if (["7", "8", "9"].includes(phone[0])) {
      if (phone[0] === "9") phone = "7" + phone;

      let firstSymbols = (phone[0] === "8") ? "8" : "+7";
      formattedInputValue = firstSymbols + " ";

      if (phone.length > 1) {
        formattedInputValue += phone.substring(1, 4);
      }

      if (phone.length >= 5) {
        formattedInputValue += ' ' + phone.substring(4, 7);
      }

      if (phone.length >= 8) {
        formattedInputValue += ' ' + phone.substring(7, 9);
      }

      if (phone.length >= 10) {
        formattedInputValue += ' ' + phone.substring(9, 11);
      }

    } else {
      formattedInputValue = '+' + phone.substring(0, 16);
    }

    return formattedInputValue;
  }

})