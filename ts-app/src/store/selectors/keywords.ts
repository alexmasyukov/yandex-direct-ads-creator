import { Selector } from 'react-redux'
import { RootState } from 'store'
import { Keyword } from 'store/types/keywords'
import { createSelector } from 'reselect'

export const getKeywords = (state: RootState): Array<Keyword> =>
  state.keywords.allIds.map((id) => state.keywords.byId[id])

export const selectKeywords: Selector<
  RootState,
  Array<Keyword>
> = createSelector(getKeywords, (keywords) => keywords)

export const selectKeywordsCount: Selector<RootState, number> = createSelector(
  selectKeywords,
  (keywords) => keywords.length
)

export const selectEnabledKeywordsCount: Selector<
  RootState,
  number
> = createSelector(
  selectKeywords,
  (keywords) => keywords.filter((keyword) => keyword.disabled === false).length
)
