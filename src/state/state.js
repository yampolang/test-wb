import {products} from "../db/TestData.js";

let basketProducts = [];
let productsInStock = [];
let missingProducts = [];
let selectedProducts = [];
export let favoritesItems = [];

// для перерендеринга всей страницы.
// не получилось перерендерить отдельные компоненты, в которых были изменены переменные
const totalRender = () => {
  let IHTML = document.body.innerHTML
  document.body.innerHTML = ''
  document.body.innerHTML = IHTML
}

// копии тестовых данных, чтобы не изменять оригинальные
products.forEach(prod => {
  basketProducts.push(Object.assign({}, prod))
})

const sortProducts = () => {
  productsInStock = basketProducts.filter(item => !item.sold_out)
  missingProducts = basketProducts.filter(item => item.sold_out)
}
sortProducts()

Object.values(productsInStock).forEach(prod => {
  let intervalValue = 1
  Object.defineProperty(prod, 'amountTaken', {
    get() {
      return intervalValue
    },
    set(newValue) {
      intervalValue = newValue
      totalRender()
    }
  })

})

export const favoritesItemsChanger = (id) => {
  if (!favoritesItems.includes(id)) {
    favoritesItems.push(id)
  } else {
    let newArr = []
    favoritesItems.filter(item => {
      if (item !== id) {
        newArr.push(item)
      }
    })
    favoritesItems = newArr
  }

  totalRender()
}

export const deleteFromBasket = id => {
  let intervalArr = []

  basketProducts.filter(prod => {
    if (prod.id !== id) {
      intervalArr.push(prod)
    }
  })
  basketProducts = intervalArr

  if (selectedProducts.includes(id)) {
    selectedProducts = selectedProducts.filter(prodId => prodId !== id)
  }

  sortProducts()
  totalRender()
}

export const changeAmountTaken = (id, value) => {
  productsInStock.find(prod => prod.id === id).amountTaken = value
}

export const changeSelectedProduct = (id) => {
  selectedProducts.includes(id) ? selectedProducts = selectedProducts.filter(prod => prod !== id) :
    selectedProducts.push(id)

  totalRender()
}

export const changeSelectedAll = () => {
  if (selectedProducts.length && selectedProducts.length === productsInStock.length) {
    selectedProducts = []
  } else {
    productsInStock.forEach(prod => {
      if (!selectedProducts.includes(prod.id)) {
        selectedProducts.push(prod.id)
      }
    })
  }

  totalRender()
}

export const checkInput = (value, rules) => {
  let errorMsgArray = []
  rules.forEach(rule => {
    Object.keys(rule).forEach(key => {
      switch(key) {
        case 'required':
          if (rule[key] && value === '') {
            errorMsgArray.push(rule.message)
          }
          break

        case 'minLength':
          if (value.length < rule[key]) {
            errorMsgArray.push(rule.message)
          }
          break

        case 'maxLength':
          if (value.length > rule[key]) {
            errorMsgArray.push(rule.message)
          }
          break

        case 'type':
          switch(rule[key]) {
            case 'email': {
              const EMAIL_REGEXP = /^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/iu;

              if (!!value && !EMAIL_REGEXP.test(value)) {
                errorMsgArray.push(rule.message)
              }

              break
            }

            case 'phone': {
              // const phoneRegexp = /(?:\+|\d)[\d\-() ]{9,}\d/g
              // if (!phoneRegexp.test(value.replace(/\D/g, ''))) {
              //   errorMsgArray.push(rule.message)
              // }

              if (!!value && value.replace(/\D/g, '').length < 11) {
                errorMsgArray.push(rule.message)
              }
              break
            }

            case 'inn': {

              break
            }
          }
      }
    })

  })

  return errorMsgArray
}

export {productsInStock, missingProducts, selectedProducts}


export const createLayer = () => {
  const el = document.createElement('div')
  el.id = 'layer'
  document.getElementById('root').appendChild(el)
}

export const destroyLayer = () => {
  if (document.getElementById('layer')) {
    document.getElementById('layer').remove()
  }
}