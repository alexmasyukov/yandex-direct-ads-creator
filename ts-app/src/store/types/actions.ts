import { Keyword } from 'store/types/keywords'

export const ADD_KEYWORDS = 'ADD_KEYWORDS'
export const SET_NOT_USE_KEYWORD = 'SET_NOT_USE_KEYWORD'

export interface AddKeywordsAction {
  type: typeof ADD_KEYWORDS
  keywords: Array<Keyword>
}

export interface SetNotUseKeywordAction {
  type: typeof SET_NOT_USE_KEYWORD
  id: string
}

export type KeywordsActionTypes = AddKeywordsAction | SetNotUseKeywordAction
