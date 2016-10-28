import jwtDecode from 'jwt-decode'
import makeActionCreator from './makeActionCreator.js'
import * as actionTypes from '../constants/actionTypes'
import * as Storage from '../storage'

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
    const token = Storage.getAuthToken()
    if (token) {
        try {
          const payload = jwtDecode(token)
          dispatch(loginSuccess(token, payload))
        } catch (e) {
          Storage.removeAuthToken()
        }
    }
  }
}
