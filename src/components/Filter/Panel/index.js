import React from 'react'
import styles from './Panel.module.sass'
import cn from 'classnames'
import { Button } from "react-bootstrap"
import Informer from "components/Filter/Informer"
import arrowDown from "assets/download-arrow.svg"
import SpinButton from "components/Filter/SpinButton";

const Panel = ({children, minusWordsCount, activeKeywordsCount, onClickInmportKeywords, onClickCopyKeywords, onClickCopyMinusWords}) => {
  return (
    <div className={styles.panel}>

      <SpinButton
        title="Импорт ключей"
        loadingTitle="Загрузка..."
        variant="outline-info"
        onClick={onClickInmportKeywords}
      />
      {/*<Button*/}
        {/*variant="outline-info"*/}
        {/*onClick={onClickInmportKeywords}*/}
        {/*className={cn(styles.btn, "mb-2")}*/}
      {/*>Импорт ключей</Button>*/}

      <img src={arrowDown} className={cn(styles.arrow, 'mb-2')}/>


      <Informer
        minusWords={minusWordsCount}
        activeKeywords={activeKeywordsCount}
      />


      <Button
        variant="outline-success"
        onClick={onClickCopyKeywords}
        className={cn(styles.btn, "mt-3")}
      >Скопировать ключи</Button>

      <Button
        variant="outline-success"
        onClick={onClickCopyMinusWords}
        className={cn(styles.btn, "mt-3")}
      >Скопировать минуса</Button>
    </div>
  )
}

export default Panel