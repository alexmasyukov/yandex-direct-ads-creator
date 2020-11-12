import React from 'react'
import { Provider } from 'react-redux'
import { createStore, applyMiddleware, compose } from 'redux'
import rootReducer from 'reduxLearn/redux/rootReducer'
import Counter from 'reduxLearn/Counter'
import { loggerMiddleware } from "reduxLearn/redux/middlewares"
import reduxThunk from 'redux-thunk'


const composeEnhancers =
  typeof window === 'object' &&
  window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ?
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
      // Specify extension’s options like name, actionsBlacklist, actionsCreators, serialize...
    }) : compose;

const store = createStore(rootReducer, composeEnhancers(applyMiddleware(
  loggerMiddleware,
  reduxThunk
)))

const App = () => {
  return (
    <Provider store={store}>
      <Counter/>
    </Provider>
  );
};

export default App;