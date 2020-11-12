import React from 'react'
import Keyword from "components/Filter/Keyword"
import styles from './KeywordsList.module.sass'

const KeywordsList = ({ keywords }) => {
  return (
    <div className={styles.keywordsList}>
      {keywords.map(item =>
        <Keyword key={item.id} {...item}/>
      )}
    </div>
  )
}

export default KeywordsList