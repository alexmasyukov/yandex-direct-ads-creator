import * as types from "store/actionTypes"

const initialState = {
  companyName: 'Тестовая_Поиск',
  region: 'Забайкальский край',
  secondTitle: {
    manually: true,
    title: 'Дарите с удовольствием!' //Дарите с удовольствием! Безупречное качество Ваш букет будет лучшим!
  },
  descriptions: [
    'Свежие букеты цветов и букеты в шляпных коробках с быстрой доставкой по Чите!',
    'Вернём деньги за доставку, если опоздываем более 5 минут!',
    'Мы делаем красивые букеты из 100% свежих цветов! Доставка - 24/7. Закажите!'
  ],
  linkUrl: 'https://klumba.store/',
  linkVisible: 'Цветы',
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
  csv: '',
  ads: [],
  lastTimeGeneratedAds: '',
  adsGenerationProcess: true
}

const ads = (state = initialState, action) => {
  switch (action.type) {
    case types.SET_ADS_PAGE_CACHE:
      return {
        ...state,
        ...action.payload
      }

    case types.SET_TITLES_PAGE_CACHE:
      console.log('reducer SET_TITLES_PAGE_CACHE');
      return {
        ...state,
        ...action.payload
      }

    case types.UPDATE_FORM_FIELD:
      return {
        ...state,
        ...action.payload
      }
  }

  return state
}

export default ads