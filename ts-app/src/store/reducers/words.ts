import { ADD_WORDS, SWITCH_DISABLE_WORD } from 'store/actions/words'
import { WordsActions, Word } from 'store/types/words'
import { normalizeTuples } from 'utils/normalize'

interface NormalizedWords {
  byId: Record<string, Word>
  // allIds: Array<string>
}

const initialState: NormalizedWords = {
  byId: {
    w1: ['w1', 'купить', true],
    w2: ['w2', 'цветы', false],
    w3: ['w3', 'sdf', false]
  }
  // allIds: ['w1', 'w2', 'w3']
}

// Array.from(new Set(allWords))

export const wordsReducer = (
  state = initialState,
  action: WordsActions
): NormalizedWords => {
  switch (action.type) {
    case ADD_WORDS:
      return normalizeTuples<Word>(action.words)

    case SWITCH_DISABLE_WORD:
      const [id, value, disabled]: Word = state.byId[action.id]
      return {
        byId: {
          ...state.byId,
          [action.id]: [id, value, !disabled]
        }
        // allIds: [...state.allIds, action.id]
      }

    default:
      return state
  }
}
