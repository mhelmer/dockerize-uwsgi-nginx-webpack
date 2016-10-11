import fetch from 'isomorphic-fetch'
import jwtDecode from 'jwt-decode'
import { checkStatus, parseJSON } from '../fetch.js'
import makeActionCreator from './makeActionCreator.js'

export const LOGIN_REQUEST = 'LOGIN_REQUEST'
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS'
export const LOGIN_FAILURE = 'LOGIN_FAILURE'
export const LOGOUT_SUCCESS = 'LOGOUT_SUCCESS'

const loginRequest = makeActionCreator(LOGIN_REQUEST)
const loginSuccess = makeActionCreator(LOGIN_SUCCESS, 'token', 'payload')
const loginFailure = makeActionCreator(LOGIN_FAILURE)
const logoutSuccess = makeActionCreator(LOGOUT_SUCCESS)

export function logout (username, password) {
  return function (dispatch) {
    localStorage.removeItem('token')
    return dispatch(logoutSuccess())
  }
}

export function login (username, password) {
  return function (dispatch) {

    dispatch(loginRequest())

    return new Promise((resolve, reject) => {
      fetch('/api-token-auth/', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({username, password})
      })
        .then(checkStatus)
        .then(parseJSON)
        .then(json => {
          localStorage.setItem('token', json.token)
          dispatch(loginSuccess(json.token, jwtDecode(json.token)))
          resolve({ username, password })
        })
        .catch(error => {
          dispatch(loginFailure())
          parseJSON(error.response).then(json => {reject({ ...json, _error: json.non_field_errors })})
        })
    })
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
