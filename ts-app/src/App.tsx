import React, { useState } from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { Layout } from 'antd'
import { ImportPage } from 'pages/Import'
import { FilterPage } from 'pages/Filter'
import { Steps } from 'components/Steps'
import { selectKeywordsCount } from 'store/selectors/keywords'
import 'antd/dist/antd.css'
import styles from './app.module.sass'

const { Sider } = Layout

function App() {
  const [currentStep, setCurrentStep] = useState(0)

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Router>
        <Sider width={300} className={styles.sider}>
          <Steps
            current={currentStep}
            hanleChange={(current) => setCurrentStep(current)}
          />
        </Sider>

        <Switch>
          <Route exact path="/import">
            <ImportPage />
          </Route>
          <Route exact path="/filter">
            <FilterPage />
          </Route>
        </Switch>
      </Router>
    </Layout>
  )
}

export default App
