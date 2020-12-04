import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import PageLayout from 'layouts/Page'
import { Word } from 'components/Word'
import { selectWords } from 'store/selectors/words'
import { switchDisbledWord } from 'store/actions/words'

export const FilterPage = () => {
  const words = useSelector(selectWords)
  const dispatch = useDispatch()

  // todo: optimaze it by medium article
  const handleWordClick = (id: string) => () => dispatch(switchDisbledWord(id))

  return (
    <PageLayout title="Шаг 2. Выбирете стоп-слова" subTitle="#шаг2">
      {words.map(([id, value, disabled]) => (
        <Word
          key={id}
          value={value}
          disabled={disabled}
          onClick={handleWordClick(id)}
        />
      ))}
    </PageLayout>
  )
}
