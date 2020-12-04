import { Word, WordsActions } from 'store/types/words'

export const ADD_WORDS = 'ADD_STOPWORD'
export const SWITCH_DISABLE_WORD = 'REMOVE_STOPWORD'

export const switchDisbledWord = (id: string): WordsActions => ({
  type: SWITCH_DISABLE_WORD,
  id
})

export const addWords = (words: Array<Word>): WordsActions => ({
  type: ADD_WORDS,
  words
})
