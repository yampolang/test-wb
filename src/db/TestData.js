export const products = [
  {
    'id': 1,
    'title': 'Футболка UZcotton мужская',
    'characteristics' : [
      {'Цвет': 'белый'},
      {'Размер': '56'}
    ],
    'pvz': 'Коледино WB',
    'seller': 'OOO Вайлдберриз',
    'img_url': 'src/assets/images/tshort.jpg',
    'img_url-mini': 'src/assets/images/tshort-mini.jpg',
    'amount': 3,
    'price': 1051,
    'discount_price': 522,
    'currency': 'сом',
    'sold_out': false
  },
  {
    'id': 2,
    'title': 'Силиконовый чехол картхолдер (отверстия) для карт, прозрачный кейс бампер на Apple iPhone XR, MobiSafe',
    'characteristics' : [
      {'Цвет': 'прозрачный'}
    ],
    'pvz': 'Коледино WB',
    'seller': 'OOO Мегапрофстиль',
    'img_url': 'src/assets/images/phone.jpg',
    'img_url-mini': 'src/assets/images/phone-mini.jpg',
    'amount': 100,
    'price': 11500,
    // 'discount_price': 10500,
    'currency': 'сом',
    'sold_out': false
  },
  {
    'id': 3,
    'title': 'Карандаши цветные Faber-Castell "Замок", набор 24 цвета, заточенные, шестигранные, Faber-Castell ',
    'characteristics': [],
    'pvz': 'Коледино WB',
    'seller': 'OOO Вайлдберриз',
    'img_url': 'src/assets/images/pencils.jpg',
    'img_url-mini': 'src/assets/images/pencils-mini.jpg',
    'amount': 2,
    'price': 475,
    'discount_price': 247,
    'currency': 'сом',
    'sold_out': false
  },

  {
    'id': 4,
    'title': 'Футболка UZcotton мужская',
    'characteristics' : [
      {'Цвет': 'белый'},
      {'Размер': '56'}
    ],
    'pvz': 'Коледино WB',
    'seller': 'OOO Вайлдберриз',
    'img_url': 'src/assets/images/tshort.jpg',
    'img_url-mini': 'src/assets/images/tshort-mini.jpg',
    'amount': 3,
    'price': 1051,
    'discount_price': 522,
    'currency': 'сом',
    'sold_out': true
  },
  {
    'id': 5,
    'title': 'Силиконовый чехол картхолдер (отверстия) для карт, прозрачный кейс бампер на Apple iPhone XR, MobiSafe',
    'characteristics' : [
      {'Цвет': 'прозрачный'}
    ],
    'pvz': 'Коледино WB',
    'seller': 'OOO Мегапрофстиль',
    'img_url': 'src/assets/images/phone.jpg',
    'img_url-mini': 'src/assets/images/phone-mini.jpg',
    'amount': 100,
    'price': 11500,
    'discount_price': 10500,
    'currency': 'сом',
    'sold_out': true
  },
  {
    'id': 6,
    'title': 'Карандаши цветные Faber-Castell "Замок", набор 24 цвета, заточенные, шестигранные, Faber-Castell ',
    'characteristics': [],
    'pvz': 'Коледино WB',
    'seller': 'OOO Вайлдберриз',
    'img_url': 'src/assets/images/pencils.jpg',
    'img_url-mini': 'src/assets/images/pencils-mini.jpg',
    'amount': 2,
    'price': 475,
    'discount_price': 247,
    'currency': 'сом',
    'sold_out': true
  },
]

export const DeliveryInfo = {
  'pvz': {
    'city': 'Бишкек',
    'street': 'Ахматбека Суюмбаева',
    'house': '12/1',
    'rating': '4.99',
    'work_hours': {
      'days': 'Ежедневно',
      'from': '10',
      'to': '21'
    },
  },
  'cost': 'Бесплатно',
  'date': [
    {
      'date': {
        'from': {
          'day': '5',
          'month': 'февраля'
        },
        'to': {
          'day': '6',
          'month': 'февраля'
        }
      },
      'products': [
        {
          'id': 1,
          'title': 'Футболка UZcotton мужская',
          'img_url_mini': 'src/assets/images/tshort-mini.jpg',
          'amount': 1,
        },
        {
          'id': 2,
          'title': 'Силиконовый чехол картхолдер (отверстия) для карт, прозрачный кейс бампер на Apple iPhone XR, MobiSafe',
          'img_url_mini': 'src/assets/images/phone-mini.jpg',
          'amount': 184,
        },
        {
          'id': 3,
          'title': 'Карандаши цветные Faber-Castell "Замок", набор 24 цвета, заточенные, шестигранные, Faber-Castell ',
          'img_url_mini': 'src/assets/images/pencils-mini.jpg',
          'amount': 184,
        },
      ]
    },
    {
      'date': {
        'from': {
          'day': '7',
          'month': 'февраля'
        },
        'to': {
          'day': '8',
          'month': 'февраля'
        }
      },
      'products': [
        {
          'id': 2,
          'title': 'Силиконовый чехол картхолдер (отверстия) для карт, прозрачный кейс бампер на Apple iPhone XR, MobiSafe',
          'img_url_mini': 'src/assets/images/phone-mini.jpg',
          'amount': 16,
        }
      ]
    }
  ]
}

export const PaymentInfo = {
  'payment_system': 'МИР',
  'card_number': '1234560000001234',
  'expiration_date': {
    'month': '01',
    'year': '30',
  }
}
