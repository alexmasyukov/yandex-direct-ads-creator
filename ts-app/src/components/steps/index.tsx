import { FC } from 'react'
import { useSelector } from 'react-redux'
import { useHistory } from 'react-router'
import { Steps as AntdSteps } from 'antd'
import { selectStopwordsCount } from 'store/selectors/words'
import {
  selectKeywordsCount,
  selectEnabledKeywordsCount
} from 'store/selectors/keywords'

const { Step } = AntdSteps

interface Props {
  current: number
  hanleChange(current: number): void
}

export const Steps: FC<Props> = (props) => {
  let history = useHistory()
  const keywordsCount = useSelector(selectKeywordsCount)
  const enabledKeywordsCount = useSelector(selectEnabledKeywordsCount)
  const stopwordsCount = useSelector(selectStopwordsCount)

  const go = (link: string) => () => history.push(link)
  return (
    <AntdSteps
      direction="vertical"
      current={props.current}
      percent={60}
      onChange={props.hanleChange}
    >
      <Step
        onClick={go('/import')}
        title="Импорт ключей"
        description={`Всего: ${keywordsCount}`}
      />
      <Step
        onClick={go('/filter')}
        // status="process"
        title="Фильтрация ключей"
        description={`Ключей: ${enabledKeywordsCount}, \nМинус-слов: ${stopwordsCount}`}
      />
      <Step
        onClick={go('/ads')}
        title="Генерация заголовков"
        // description="Настройте заголовки"
      />
      <Step
        onClick={go('/ads')}
        title="Генерация объявлений"
        // description="Настройте описания и дополнения"
      />
      <Step
        onClick={go('/finish')}
        title="Экспорт"
        description={`Объявлений: `}
      />
    </AntdSteps>
  )
}
