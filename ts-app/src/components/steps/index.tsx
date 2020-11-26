import { FC } from 'react'
import { useHistory } from 'react-router'
import { Steps as AntdSteps } from 'antd'
const { Step } = AntdSteps

interface Props {
  current: number
  keywordsCount: number
  stopwordsCount: number
  adsCount: number
  hanleChange(current: number): void
}

export const Steps: FC<Props> = (props) => {
  let history = useHistory()

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
        description={`Всего: ${props.keywordsCount}`}
      />
      <Step
        onClick={go('/filter')}
        // status="process"
        title="Фильтрация ключей"
        description={`Ключей: ${props.keywordsCount}, \nМинус-слов: ${props.stopwordsCount}`}
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
        description={`Всего: ${props.adsCount}`}
      />
    </AntdSteps>
  )
}
