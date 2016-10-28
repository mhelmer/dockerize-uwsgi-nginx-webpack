import { routerReducer } from 'react-router-redux'
import { combineReducers } from 'redux'
import { reducer as formReducer } from 'redux-form'
import { users } from './users'
import auth from './auth'


const rootReducer = combineReducers({
  routing: routerReducer,
  form: formReducer,
  auth,
  users
})

export default rootReducer
