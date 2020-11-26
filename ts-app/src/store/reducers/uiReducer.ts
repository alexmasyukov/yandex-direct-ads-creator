import { KeywordsActionTypes, ADD_KEYWORDS } from 'store/types/keywords'
import { UIActionTypes, START_IMPORT_KEYWORDS } from 'store/types/ui'

interface UI {
  keywordsImported: boolean
}

const inititalState: UI = {
  keywordsImported: false
}

export const UIReducer = (
  state = inititalState,
  action: UIActionTypes | KeywordsActionTypes
): UI => {
  switch (action.type) {
    case START_IMPORT_KEYWORDS:
      return { ...state, keywordsImported: false }

    case ADD_KEYWORDS:
      return { ...state, keywordsImported: true }

    default:
      return state
  }
}
