import React from 'react'
import styles from './Word.module.sass'

const Word = ({ id = 0, word = '[word]', unactive = false, onClick }) => {
  const cls = [styles.word]
  unactive && cls.push(styles.unactive)

  return (
    <div
      onClick={() => {
        onClick(id, word)
      }}
      className={cls.join(' ')}
    >
      {word}
    </div>
  )
}

export default Word