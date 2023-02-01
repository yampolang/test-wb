export const LSActions = {
  inputValues: {
    get() {
      return JSON.parse(localStorage.getItem('inputValues')) || {
        name: '',
        surname: '',
        email: '',
        phone: '',
        inn: '',
      }
    },

    set(key, value) {
      let interval = this.get()
      interval[key] = value
      localStorage.setItem('inputValues', JSON.stringify(interval))
    },
  },

  selectedAddress: {
    get() {
      return localStorage.getItem('selectedAddress') || null
    },

    set(id) {
      localStorage.setItem('selectedAddress', id)
    },
  },

  selectedCard: {
    get() {
      return localStorage.getItem('selectedCard') || null
    },

    set(id) {
      localStorage.setItem('selectedCard', id)
    },
  }

  // clear: () => localStorage.clear()
}