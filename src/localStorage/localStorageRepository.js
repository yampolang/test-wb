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

  clear: () => localStorage.clear()
}