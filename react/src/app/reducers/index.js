import { routerReducer } from 'react-router-redux'
import { combineReducers } from 'redux'
import { reducer as formReducer } from 'redux-form'

import users, * as fromUsers from './users'
import auth, * as fromAuth from './auth'


const rootReducer = combineReducers({
  routing: routerReducer,
  form: formReducer,
  auth,
  users,
})

export default rootReducer

export const getIsAuthenticated = state => fromAuth.getIsAuthenticated(state.auth)
export const getUserId = state => fromAuth.getUserId(state.auth)
export const getCurrentUser = state => getUser(state, getUserId(state))

export const getAllUsers = state => fromUsers.getAll(state.users)
export const getIsFetchingUsers = state => fromUsers.getIsFetching(state.users)
export const getUser = (state, id) => fromUsers.getUser(state.users, id)
