import React from 'react'
import { Provider } from 'react-redux'
import store from 'store/configStore'
// import MenuLayout from 'layouts/MenuLayout'
import './App.css'
// import Creator from "pages/Creator";
import Filter from "pages/Filter";

function App() {
  return (
    <Provider store={store}>
      {/*<Creator/>*/}
      <Filter/>

      {/*<MenuLayout>*/}
      {/*</MenuLayout>*/}
      {/*<Router>*/}

      {/*<Switch>*/}
      {/*<Route path={'/title'} component={Titles}/>*/}
      {/*<Route path={'/ads'} component={Ads}/>*/}
      {/*<Route path={'/'} component={Titles}/>*/}
      {/*</Switch>*/}
      {/*</MenuLayout>*/}
      {/*</Router>*/}
    </Provider>
  )
}

export default App
