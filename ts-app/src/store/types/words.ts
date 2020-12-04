import { ADD_WORDS, SWITCH_DISABLE_WORD } from 'store/actions/words'

export type Word = [id: string, value: string, disabled: boolean]

export interface AddWordsAction {
  type: typeof ADD_WORDS
  words: Array<Word>
}

export interface SwitchDisabledWordAction {
  type: typeof SWITCH_DISABLE_WORD
  id: string
}

export type WordsActions = AddWordsAction | SwitchDisabledWordAction
