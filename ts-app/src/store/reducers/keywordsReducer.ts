import { Keyword, NormalizedKeywords } from 'store/types/keywords'
import { normalize } from 'utils/normalize'
import {
  KeywordsActionTypes,
  ADD_KEYWORDS,
  SET_NOT_USE_KEYWORD
} from 'store/types/actions'

const initialState: NormalizedKeywords = {
  byId: {
    k1: { id: 'k1', keyword: 'купить цветы', use: true },
    k2: { id: 'k2', keyword: 'купить цветы sdf', use: true }
  },
  allIds: ['k1', 'k2']
}

export const KeywordsReducer = (
  state = initialState,
  action: KeywordsActionTypes
): NormalizedKeywords => {
  switch (action.type) {
    case ADD_KEYWORDS:
      return normalize<Keyword>(action.keywords)

    case SET_NOT_USE_KEYWORD:
      return {
        byId: {
          ...state.byId,
          [action.id]: {
            ...state.byId[action.id],
            use: false
          }
        },
        allIds: [...state.allIds, action.id]
      }

    default:
      return state
  }
}
