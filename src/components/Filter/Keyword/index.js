import React from 'react'
import styles from "./Keyword.module.sass"

const Keyword = ({ id = 0, keyword = '[keyword]', unactive = false, onClick }) => {
  const cls = [styles.keyword]
  unactive && cls.push(styles.unactive)
  return (
    <div
      // onClick={() => {
      //   onClick(id, keyword)
      // }}
      className={cls.join(' ')}
    >
      {keyword}
    </div>
  )
}

export default Keyword