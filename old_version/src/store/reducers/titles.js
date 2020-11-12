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
    '!'
  ],
  firstToUpperCase: [
    'чита'
  ]
}

const titles = (state = initialState, action) => {
  switch (action.type) {
    case types.SET_TITLES_PAGE_CACHE:
      return {
        ...state,
        ...action.payload
      }

    case types.SET_DATA:
      return {
        ...state,
        data: action.payload
      }

    // case types.UPDATE_TITLES:
    //   return {
    //     ...state,
    //     titles: action.payload
    //   }
    //
    // case types.UPDATE_FORM_FIELD:
    //   return {
    //     ...state,
    //     ...action.payload
    //   }

  }

  return state
}

export default titles