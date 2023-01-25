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
      return JSON.parse(localStorage.getItem('selectedAddress')) || {
        addressId: '',
      }
    },

    set(id) {
      localStorage.setItem('selectedAddress', JSON.stringify(id))
    },
  },

  clear: () => localStorage.clear()
}