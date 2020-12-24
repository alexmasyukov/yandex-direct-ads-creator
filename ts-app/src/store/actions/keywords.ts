import { Keyword } from 'store/types/keywords'
import {
  KeywordsActionTypes,
  ADD_KEYWORDS,
  SET_NOT_USE_KEYWORD
} from 'store/types/actions'

export const addKeywords = (keywords: Array<Keyword>): KeywordsActionTypes => ({
  type: ADD_KEYWORDS,
  keywords
})

export const setNotUseKeyword = (id: string): KeywordsActionTypes => ({
  type: SET_NOT_USE_KEYWORD,
  id
})
