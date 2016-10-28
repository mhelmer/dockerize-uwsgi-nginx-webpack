import * as actionTypes from '../constants/actionTypes'
import { combineReducers } from 'redux'
import { updateObject, createReducer } from './utils'

const isFetching = createReducer(false, {
  [actionTypes.LOGIN_FAILURE]: () => false,
  [actionTypes.LOGIN_REQUEST]: () => true,
  [actionTypes.LOGIN_SUCCESS]: () => false,
})

const isAuthenticated = createReducer(false, {
  [actionTypes.LOGIN_FAILURE]: () => false,
  [actionTypes.LOGIN_SUCCESS]: () => true,
  [actionTypes.LOGOUT_SUCCESS]: () => false,
})

const payload = createReducer(null, {
  [actionTypes.LOGIN_SUCCESS]: (state, action) => action.payload,
  [actionTypes.LOGOUT_SUCCESS]: () => null,
})

const token = createReducer(null, {
  [actionTypes.LOGIN_SUCCESS]: (state, action) => action.token,
  [actionTypes.LOGOUT_SUCCESS]: () => null,
})

const auth = combineReducers({
  isFetching,
  isAuthenticated,
  payload,
  token,
})

export default auth

export const getIsAuthenticated = state => state.isAuthenticated
