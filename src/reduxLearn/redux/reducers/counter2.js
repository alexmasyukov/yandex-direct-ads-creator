const initialState = {
  counter: 10
}

export default function (state = initialState, action) {
  switch (action.type) {
    case 'CHANGE2':
      return {
        counter: state.counter + action.payload
      }
  }

  return state
}