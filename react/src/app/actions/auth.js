import makeActionCreator from './makeActionCreator.js'
import * as actionTypes from '../constants/actionTypes'

export const loginRequest = makeActionCreator(actionTypes.LOGIN_REQUEST, 'values', 'resolve', 'reject')
export const loginSuccess = makeActionCreator(actionTypes.LOGIN_SUCCESS, 'token', 'payload')
export const loginFailure = makeActionCreator(actionTypes.LOGIN_FAILURE, 'error')
export const logoutSuccess = makeActionCreator(actionTypes.LOGOUT_SUCCESS)

export function logout (username, password) {
  return function (dispatch) {
    localStorage.removeItem('token')
    return dispatch(logoutSuccess())
  }
}

export function loadAuthFromStorage() {
  return function(dispatch) {
    const token = localStorage.getItem('token')
    if (token) {
        try {
          const payload = jwtDecode(token)
          dispatch(loginSuccess(token, payload))
        } catch (e) {
          localStorage.removeItem('token')
        }
    }
  }
}
