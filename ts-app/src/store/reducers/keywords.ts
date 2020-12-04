import { Keyword } from 'store/types/keywords'
import { normalize } from 'utils/normalize'
import {
  KeywordsActionTypes,
  ADD_KEYWORDS,
  SET_DISABLED_KEYWORD
} from 'store/types/keywords'

interface NormalizedKeywords {
  byId: Record<string, Keyword>
  allIds: Array<string>
}

const initialState: NormalizedKeywords = {
  byId: {
    k1: { id: 'k1', text: 'купить цветы', disabled: false },
    k2: { id: 'k2', text: 'купить цветы чита', disabled: false },
    k3: { id: 'k3', text: 'заказать букет в чите', disabled: true }
  },
  allIds: ['k1', 'k2', 'k3']
}

export const keywordsReducer = (
  state = initialState,
  action: KeywordsActionTypes
): NormalizedKeywords => {
  switch (action.type) {
    case ADD_KEYWORDS:
      // for (let i = 0; i < 9999999999; i++) {
      //   let x = (i * 444448933) / 21
      // }
      return normalize<Keyword>(action.keywords)

    case SET_DISABLED_KEYWORD:
      return {
        byId: {
          ...state.byId,
          [action.id]: {
            ...state.byId[action.id],
            disabled: false
          }
        },
        allIds: [...state.allIds, action.id]
      }

    default:
      return state
  }
}
