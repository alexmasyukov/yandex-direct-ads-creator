import { combineReducers } from 'redux'

const initialState = {
  keywords: [], // normalized

  companyName: 'Тестовая_Поиск',
  region: 'Забайкальский край',
  secondTitle: {
    manually: true,
    title: 'Дарите с удовольствием!'
  },
  descriptions: [
    'Свежие букеты цветов и букеты в шляпных коробках с быстрой доставкой по Чите!',
    'Вернём деньги за доставку, если опоздываем более 5 минут!',
    'Мы делаем красивые букеты из 100% свежих цветов! Доставка - 24/7. Закажите!'
  ],
  url: 'https://klumba.store/',
  urlTitle: 'Цветы',
  fastLinks: [
    {
      title: 'Каталог',
      description: '',
      url: 'https://klumba.store/catalog'
    },
    {
      title: 'Доставка',
      description: '',
      url: 'https://klumba.store/delivery'
    },
    {
      title: 'Контакты',
      description: '',
      url: 'https://klumba.store/contacts'
    },
    {
      title: 'О нас',
      description: '',
      url: 'https://klumba.store/about'
    }
  ],
  maxOneTitleLenght: 30,
  maxTwoTitleLenght: 35,
  deleteNeedless: [
    'в',
    'на',
    'из',
    'в интернет',
    'для',
    'ru',
    'ру',
    'с',
    'по',
    'и',
    'м',
    'интернет',
    'в интернете',
    'интернете',
    'от',
    'россия'
  ],
  addNeedless: ['!'],
  firstToUpperCase: ['чита']

  // ads: [],
  // lastTimeGeneratedAds: '',
  // adsGenerationProcess: true
}

const rootReducer = combineReducers({
  // ...initialState
})

// entities: combineReducers({
//   keywords: [{
//     id: 'id1',
//     text: 'text text'
//   }],
//   ads: [{
//     keyword: 'id1',
//     titles: ['', '', '']
//   }]
//   stopWords: []
//   // filteredKeywords
//   // stopWords: []
// }),
// ui: combineReducers({
// })

/**
 * https://github.com/jalbertsr/redux-store/blob/master/src/services/dataService.js
 * import fetch from 'isomorphic-fetch'
 *
 * productList: {
    products: [],
    error: null,
    loading: false
 *
 * store = {
 *   entities: {
 *     products: {
 *       byId: {
 *         _id_: {
 *           ...
 *         },
 *         ...
 *       },
 *       allIds: [_id_, ...]
 *     },
 *     filters: {
 *       byId: {
 *
 *       },
 *       allIds: []
 *     }
 *   }
 * }
 *
 */

export default rootReducer
