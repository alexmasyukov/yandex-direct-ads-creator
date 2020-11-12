import React from 'react'
import styles from "./Keyword.module.sass"

const Keyword = ({keyword = '[keyword]', unactive = false }) => {
  const cls = [styles.keyword]
  unactive && cls.push(styles.unactive)
  return (
    <div className={cls.join(' ')}>
      {keyword}
    </div>
  )
}

export default Keyword