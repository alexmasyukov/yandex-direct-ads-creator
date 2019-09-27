import { ADD, ADD_NUMBER } from "reduxLearn/redux/actions/acitonTypes";

export function add() {
  return {
    type: ADD
  }
}

export function addNumber(number) {
  return {
    type: ADD_NUMBER,
    payload: number
  }
}


export const addAsync = (number) => dispatch => {
  setTimeout(() => {
    dispatch(addNumber(number))
  }, 3000)
}