import React, { useState } from 'react'
import styles from './Expander.module.sass'


const Expander = ({ title = 'title', expand = false, children}) => {
  const [isExpand, setExpand] = useState(expand)
  return (
    <div className={styles.expander} >
      <div className={styles.title} onClick={() => setExpand(!isExpand)}>
        {title}
      </div>
      {isExpand && (
        <div>
          {children}
        </div>
      )}
    </div>
  )
}

export default Expander