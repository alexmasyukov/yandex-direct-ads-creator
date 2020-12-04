export const ADD_KEYWORDS = 'ADD_KEYWORDS'
export const SET_DISABLED_KEYWORD = 'SET_DISABLED_KEYWORD'

export interface Keyword {
  id: string
  text: string
  disabled: boolean
}

interface AddKeywordsAction {
  type: typeof ADD_KEYWORDS
  keywords: Array<Keyword>
}

interface SetDisabledKeywordAction {
  type: typeof SET_DISABLED_KEYWORD
  id: string
}

export type KeywordsActionTypes = AddKeywordsAction | SetDisabledKeywordAction
