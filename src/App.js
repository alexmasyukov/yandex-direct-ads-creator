import React from 'react'
import { Switch, Route } from 'react-router-dom'
import { BrowserRouter as Router } from "react-router-dom";
import TitleGenerator from "pages/TitleGenerator";
import AdsGenerator from "pages/AdsGenerator";
import MenuLayout from "layouts/MenuLayout";

import './App.css'


function App() {
  return (
    <Router>
      <MenuLayout>
        <Switch>
          <Route path={'/title-generator'} component={TitleGenerator}/>
          <Route path={'/ads-generator'} component={AdsGenerator}/>
          <Route path={'/'} component={TitleGenerator}/>
        </Switch>
      </MenuLayout>
    </Router>
  )
}

export default App
