import React from 'react'
import { Switch, Route } from 'react-router-dom'
import { BrowserRouter as Router } from 'react-router-dom'
import { Provider } from 'react-redux'
import store from 'store/configStore'
import Titles from 'pages/Titles'
import Ads from 'pages/Ads'
import MenuLayout from 'layouts/MenuLayout'
import './App.css'

function App() {
  return (
    <Provider store={store}>
      <Router>
        <MenuLayout>
          <Switch>
            <Route path={'/title'} component={Titles}/>
            <Route path={'/ads'} component={Ads}/>
            <Route path={'/'} component={Titles}/>
          </Switch>
        </MenuLayout>
      </Router>
    </Provider>
  )
}

export default App
