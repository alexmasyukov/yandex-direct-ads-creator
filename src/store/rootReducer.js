import { combineReducers } from "redux"
import titles from './reducers/titles'
import ads from './reducers/ads'
import titlesDataGrid from './reducers/titlesDataGrid'

const rootReducer = combineReducers({
  // titles,
  titlesPageCache: titles,
  adsPageCache: ads,
  titlesDataGridCache: titlesDataGrid
})

export default rootReducer