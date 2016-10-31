import * as actionTypes from '../constants/actionTypes'
import { combineReducers } from 'redux'
import { updateObject, createReducer } from './utils'

const isFetching = createReducer(false, {
  [actionTypes.LOGIN.FAILURE]: () => false,
  [actionTypes.LOGIN.REQUEST]: () => true,
  [actionTypes.LOGIN.SUCCESS]: () => false,
})

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
