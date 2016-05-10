import { routerReducer } from 'react-router-redux'
import { combineReducers } from 'redux'
import { users } from './users.js'
import { auth } from './auth.js'


const rootReducer = combineReducers({
  routing: routerReducer,
  auth,
  users
})

export default rootReducer
