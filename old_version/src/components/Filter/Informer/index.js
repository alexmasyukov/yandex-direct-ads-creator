import React from 'react'
import cn from 'classnames'
import styles from './Informer.module.sass'


const Informer = ({minusWords = 0, activeKeywords = 0}) => {
  return (
    <div className={styles.informer}>
      <h4>Результат</h4>
      <p>Минус слова: <b>{minusWords}</b></p>
      <p className={cn(activeKeywords===0 && styles.red)}>
        Ключевые фразы: <b>{activeKeywords}</b>
      </p>
    </div>
  )
}

export default Informer