import { RootState } from 'store'
import { Keyword } from 'store/types/keywords'

export const selectKeywords = (state: RootState): Array<Keyword> =>
  state.keywords.allIds.map((id) => state.keywords.byId[id])

export const selectKeywordsCount = (state: RootState): number =>
  state.keywords.allIds.length
