import * as types from "store/actionTypes";

const initialState = []

const titlesDataGrid = (state = initialState, action) => {
  switch (action.type) {
    case types.SET_TITLES_DATAGRID_CACHE:
      // console.log('aciton payload SET_TITLES_DATAGRID_CACHE', action.payload);
      return [...action.payload]
  }

  return state
}

export default titlesDataGrid