import React from 'react'
import styles from './Word.module.sass'

const Word = ({ id = 0, word = '[word]', unactive = false, isNotUse = false, onClick, onMouseEnter }) => {
  const cls = [styles.word]
  unactive && cls.push(styles.unactive)
  isNotUse && cls.push(styles.isNotUse)
  return (
    <div
      onClick={() => {
        onClick(id, word)
      }}
      onMouseEnter={() => onMouseEnter(word)}
      className={cls.join(' ')}
    >
      {word}
    </div>
  )
}

export default Word