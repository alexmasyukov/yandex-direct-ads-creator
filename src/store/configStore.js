import { createStore } from 'redux'
import rootReducer from "store/rootReducer"

const store = createStore(rootReducer)


store.subscribe(() => console.log('subscribe', store.getState()))

export default store