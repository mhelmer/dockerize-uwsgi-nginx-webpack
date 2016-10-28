import * as actionTypes from '../constants/actionTypes'
import { updateObject, createReducer } from './utils'

const loginRequest = (state, action) => updateObject(state, {
  isFetching: true,
  isAuthenticated: false,
})

const loginSucces = (state, action) => updateObject(state, {
  token: action.token,
  payload: action.payload,
  isFetching: false,
  isAuthenticated: true,
})
const loginFailure = (state, action) => updateObject(state, {
  token: null,
  payload: null,
  isFetching: false,
  isAuthenticated: false,
})
const logoutSuccess = (state, action) => updateObject(state, {
  token: null,
  payload: null,
  isFetching: false,
  isAuthenticated: false,
})

export const auth = createReducer({
    isFetching: false,
    isAuthenticated: false,
}, {
  [actionTypes.LOGIN_REQUEST]: loginRequest,
  [actionTypes.LOGIN_SUCCESS]: loginSucces,
  [actionTypes.LOGIN_FAILURE]: loginFailure,
  [actionTypes.LOGOUT_SUCCESS]: logoutSuccess,
})
