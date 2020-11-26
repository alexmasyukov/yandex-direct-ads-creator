import React, { useState } from 'react'
import {
  BrowserRouter as Router,
  Switch,
  Route
} from 'react-router-dom'
import ImportPage from 'pages/ImportPage'
import { useSelector } from 'react-redux'
import { selectKeywordsCount } from 'store/selectors/keywords'
import { Steps } from 'components/steps'
import { Layout } from 'antd'
import styles from './app.module.sass'
import 'antd/dist/antd.css'

const { Sider } = Layout

function App() {
  const [currentStep, setCurrentStep] = useState(0)
  const keywordsCount = useSelector(selectKeywordsCount)

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Router>
        <Sider width={300} className={styles.sider}>
          <div className={styles.logo}>
            <h1>
              Yandex <span>Ads Creator</span>
            </h1>
          </div>
          <Steps
            current={currentStep}
            keywordsCount={keywordsCount}
            stopwordsCount={0}
            adsCount={0}
            hanleChange={(current) => setCurrentStep(current)}
          />
        </Sider>

        <Switch>
          <Route exact path="/">
            <div>Home</div>
          </Route>
          <Route exact path="/import">
            <ImportPage />
          </Route>
          <Route path="/ads">{/* <Ads /> */}</Route>
          <Route path="/dashboard">
            <div>dashboard</div>
          </Route>
        </Switch>
      </Router>
    </Layout>
  )
}

export default App
