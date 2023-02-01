import("./ui/TextInput.js");
import {checkInput} from "../state/state.js"
import {LSActions} from "../localStorage/localStorageRepository.js";

customElements.define('basket-recipient', class extends HTMLElement {
  constructor() {
    super();

    this.rules = {
      name: [
        {required: true, message: 'Укажите имя'},
      ],
      surname: [
        {required: true, message: 'Введите фамилию'},
      ],
      email: [
        {required: true, message: 'Укажите электронную почту'},
        {type: 'email',  message: 'Проверьте адрес электронной почты'},
      ],
      phone: [
        {required: true, message: 'Укажите номер телефона'},
        {type: 'phone',  message: 'Формат: +9 999 999 99 99'},
      ],
      inn: [
        {required: true, message: 'Укажите ИНН'},
        {minLength: 10, message: 'Длина ИНН должна быть больше 10 цифр'},
        {maxLength: 12, message: 'Длина ИНН должна быть не больше 12 цифр'},
      ],
    }

    this.errors = {
      name: [],
      surname: [],
      email: [],
      phone: [],
      inn: [],
    }

    this.inputValues = LSActions.inputValues.get()
  }


  render() {
    this.innerHTML = `
      <div class="title__container">
        <h3>Получатель</h3>
      </div>
      
      <div class="input__group">
        <text-input 
          idText="name" 
          label="Имя" 
          value="${this.inputValues.name}"
          errors="${this.errorsConvertation(this.errors.name)}">
        </text-input>
        
        <text-input 
          idText="surname" 
          label="Фамилия" 
          value="${this.inputValues.surname}"
          errors="${this.errorsConvertation(this.errors.surname)}">
        </text-input>
      </div>
      
      <div class="input__group">
        <text-input 
          idText="email" 
          label="Электронная почта" 
          value="${this.inputValues.email}"
          errors="${this.errorsConvertation(this.errors.email)}">
        </text-input>
        
        <text-input 
          idText="phone" 
          label="Телефон" 
          value="${this.inputValues.phone}"
          errors="${this.errorsConvertation(this.errors.phone)}"
          type="phone-masked">
        </text-input>
        
        <text-input 
          idText="inn" 
          label="ИНН" 
          remark="Для таможенного оформления" 
          value="${this.inputValues.inn}"
          errors="${this.errorsConvertation(this.errors.inn)}"
          type="num"
          maxLength="12">
        </text-input>
      </div>
    `
  }

  connectedCallback() {
    this.render()

    let inputs = this.querySelectorAll('text-input')

    inputs.forEach(inp => {
      const fieldName = inp.getAttribute('idText')

      inp.addEventListener('input', e => {
        fieldName === 'phone' ? LSActions.inputValues.set(fieldName, e.target.value.replace(/\D/g, '')) :
          LSActions.inputValues.set(fieldName, e.target.value);
        this.inputValues = LSActions.inputValues.get()
      })

      inp.addEventListener('focusout', e => {
        this.errors[fieldName] = checkInput(e.target.value.trim(), this.rules[fieldName])
        this.focusOutRender()
      })

    })

   /* Ловим клик от кнопки "Заказать"
    * Валидируем значения из локального хранилища.
    * ...
    *
    * Это выглядит ужасно. Можно конечно написать свой мини eventBus, как во vue.js, но на него времени уже нет.
    * */
    document.addEventListener('click', e => {
      e.composedPath().forEach(path => {
        if (path.className === 'submit') {
          let LSvalues = LSActions.inputValues.get()
          Object.keys(LSvalues).forEach(key => {
            this.errors[key] = checkInput(LSvalues[key], this.rules[key])

            if (this.errors[key].length) this.scrollIntoView({behavior: "smooth"})
          })
          this.focusOutRender()


        }
      })
    })

  }

  focusOutRender() {
    this.connectedCallback()
  }

  errorsConvertation(arr) {
    return arr.join(';')
  }

})