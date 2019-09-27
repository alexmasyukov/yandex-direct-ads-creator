import React from 'react'
import { Switch, Route } from 'react-router-dom'
import TitleGenerator from "pages/TitleGenerator";
import AdsGenerator from "pages/AdsGenerator";
import MenuLayout from "Layouts/MenuLayout";

import './App.css'


function App() {
  return (
    <MenuLayout>
      <Switch>
        <Route path={'/title-generator'} component={TitleGenerator}/>
        <Route path={'/ads-generator'} component={AdsGenerator}/>
        <Route path={'/'} component={TitleGenerator}/>
      </Switch>
    </MenuLayout>
  )
}

export default App
