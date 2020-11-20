import React, { FC, useState } from 'react'
import { Steps, Row, Col } from 'antd'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  useHistory
} from 'react-router-dom'
import { Ads } from 'pages/ads'
import styles from './app.module.sass'
import 'antd/dist/antd.css'

const { Step } = Steps

interface Props {
  current: number
  keywordsCount: number
  stopwordsCount: number
  adsCount: number
  hanleChange(current: number): void
}

const AllSteps: FC<Props> = (props) => {
  let history = useHistory()

  const go = (link: string) => () => history.push(link)

  return (
    <>
      <div className={styles.logo}>
        <h1>
          Yandex <span>Ads Creator</span>
        </h1>
      </div>
      <Steps
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
          description="Настройте заголовки"
        />
        <Step
          onClick={go('/ads')}
          title="Генерация объявлений"
          description="Настройте описания и дополнения"
        />
        <Step
          onClick={go('/finish')}
          title="Экспорт"
          description={`Всего: ${props.adsCount}`}
        />
      </Steps>
    </>
  )
}

function App() {
  const [currentStep, setCurrentStep] = useState(2)

  return (
    <Row gutter={[16, 24]}>
      <Router>
        <Col className="gutter-row" span={6}>
          <AllSteps
            current={currentStep}
            keywordsCount={0}
            stopwordsCount={0}
            adsCount={0}
            hanleChange={(current) => setCurrentStep(current)}
          />
        </Col>
        <Col className="gutter-row" span={6}>
          <Switch>
            <Route exact path="/">
              <div>Home</div>
            </Route>
            <Route path="/ads">
              <Ads />
            </Route>
            <Route path="/dashboard">
              <div>dashboard</div>
            </Route>
          </Switch>
        </Col>
      </Router>
    </Row>
  )
}

export default App
