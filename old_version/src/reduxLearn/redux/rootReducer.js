import { combineReducers } from 'redux'
import counter1 from 'reduxLearn/redux/reducers/counter1'
import counter2 from 'reduxLearn/redux/reducers/counter2'

export default combineReducers({
  counter1,
  counter2
})