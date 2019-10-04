import * as types from "store/actionTypes"
import { oneKeywords } from "data/oneKeywords"

const initialState = {
  data: [],
  titles: [],
  keywords: oneKeywords,
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
  addNeedless: [
    '! Недорого!',
    '! Дешево!',
    '!'
  ],
  toUpperFirstCase: [
    'чита'
  ]
}

export const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.SET_DATA:
      return {
        ...state,
        data: action.payload
      }

    case types.UPDATE_KEYWORDS:
      return {
        ...state,
        keywords: action.payload
      }

    case types.UPDATE_TITLES:
      return {
        ...state,
        titles: action.payload
      }
  }

  return state
}