import { createSelector, Selector } from 'reselect'
import { RootState } from 'store'
import { Word } from 'store/types/words'

export const getWords = (state: RootState): Array<Word> =>
  Object.values(state.words.byId)
// state.words.allIds.map((id) => state.words.byId[id])

export const selectWords: Selector<RootState, Array<Word>> = createSelector(
  getWords,
  (words) => words
)

export const selectStopwordsCount = (state: RootState): number => {
  const words = selectWords(state)

  return words.filter(([_id, _value, disabled]) => disabled === true).length
}
