import { routerReducer } from 'react-router-redux'
import { combineReducers } from 'redux'
import { reducer as formReducer } from 'redux-form';
import { users } from './users.js'
import { auth } from './auth.js'


const rootReducer = combineReducers({
  routing: routerReducer,
  form: formReducer,
  auth,
  users
})

export default rootReducer
