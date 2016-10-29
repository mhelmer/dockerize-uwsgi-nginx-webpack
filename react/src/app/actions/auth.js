import makeActionCreator from './makeActionCreator.js'
import * as actionTypes from '../constants/actionTypes'
import * as Storage from '../storage'

export const loginRequest = makeActionCreator(actionTypes.LOGIN_REQUEST, 'values', 'resolve', 'reject')
export const loginSuccess = makeActionCreator(actionTypes.LOGIN_SUCCESS, 'token', 'payload')
export const loginFailure = makeActionCreator(actionTypes.LOGIN_FAILURE, 'error')
export const logoutRequest = makeActionCreator(actionTypes.LOGOUT_REQUEST)
export const logoutSuccess = makeActionCreator(actionTypes.LOGOUT_SUCCESS)
export const loadAuthFromStorage = makeActionCreator(actionTypes.LOAD_AUTH)

