import { combineReducers } from 'redux'
import * as actionTypes from '../constants/actionTypes'
import { updateObject, createReducer, createIsFetching } from './utils'

const isFetching = createIsFetching(actionTypes.LOGIN)

const isAuthenticated = createReducer(false, {
  [actionTypes.LOGIN.FAILURE]: () => false,
  [actionTypes.LOGIN.SUCCESS]: () => true,
  [actionTypes.LOGOUT.SUCCESS]: () => false,
})

const payload = createReducer(null, {
  [actionTypes.LOGIN.SUCCESS]: (state, action) => action.payload,
  [actionTypes.LOGOUT.SUCCESS]: () => null,
})

const token = createReducer(null, {
  [actionTypes.LOGIN.SUCCESS]: (state, action) => action.token,
  [actionTypes.LOGOUT.SUCCESS]: () => null,
})

const auth = combineReducers({
  isFetching,
  isAuthenticated,
  payload,
  token,
})

export default auth

export const getIsAuthenticated = state => state.isAuthenticated
export const getUserId = state => state.payload.user_id
