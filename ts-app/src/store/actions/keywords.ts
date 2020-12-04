import { Keyword } from 'store/types/keywords'
import {
  KeywordsActionTypes,
  ADD_KEYWORDS,
  SET_DISABLED_KEYWORD
} from 'store/types/keywords'

export const addKeywords = (keywords: Array<Keyword>): KeywordsActionTypes => ({
  type: ADD_KEYWORDS,
  keywords
})

export const setNotUseKeyword = (id: string): KeywordsActionTypes => ({
  type: SET_DISABLED_KEYWORD,
  id
})
