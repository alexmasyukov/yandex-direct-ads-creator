const redux = require('redux');

const actionTypes = ['ADD', 'ADDNUMBER']
const [ ADD, ADDNUMBER ] = actionTypes

const initialState = {
  counter: 0
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD:
      return {
        counter: ++state.counter
      }
    case ADDNUMBER:
      return {
        counter: ++action.payload
      }
  }
  return state
}

const store = redux.createStore(reducer)

store.subscribe(() => {
  console.log(store.getState());
})



const actionADD = {
  type: ADD,
  payload: {}
}



store.dispatch(actionADD)
store.dispatch(actionADD)
store.dispatch(actionADD)
store.dispatch(actionADD)

store.dispatch({
  type: ADDNUMBER,
  payload: 10
})