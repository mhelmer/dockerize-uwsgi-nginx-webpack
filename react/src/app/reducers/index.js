import { routerReducer } from 'react-router-redux'
import { combineReducers } from 'redux'
import { users } from './users.js'


const rootReducer = combineReducers({
  routing: routerReducer,
  users
})

export default rootReducer
