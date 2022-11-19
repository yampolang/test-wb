export const PriceFormat = value => {
  const reg = /\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g
  return value.toString().replace(reg, ' ')
}

export const CardFormat = value => {
  return value.replace(/^(.{6})([0-9]{6})/, '$1••••••').replace(/(.{4})/g, '$1 ')
}

export const CardImage = value => {
  const cards = {
    "МИР": "src/assets/images/mir.png",
  }

  return Object.keys(cards).includes(value) ? cards[value] : '???'
}

export const WordDeclension = (number, wordIn1, wordFrom2To4, wordFrom5To0) => {
  number += ''
  switch(number[number.length - 1]) {
    case '1':
      return wordIn1

    case '2':
    case '3':
    case '4':
      return wordFrom2To4

    default:
      return wordFrom5To0
  }
}