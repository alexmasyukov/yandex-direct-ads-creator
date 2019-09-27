import { ADD, ADD_NUMBER } from "reduxLearn/redux/actions/acitonTypes";

const initialState = {
  counter: 20
}

export default function (state = initialState, action) {
  switch (action.type) {
    case ADD:
      return {
        counter: ++state.counter
      }
    case ADD_NUMBER:
      return {
        counter: state.counter + action.payload
      }
  }

  return state
}