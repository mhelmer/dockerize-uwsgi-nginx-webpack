import makeActionCreator from './makeActionCreator.js'
import * as actionTypes from '../constants/actionTypes'

export const loginRequest = makeActionCreator(actionTypes.LOGIN.REQUEST, 'values', 'resolve', 'reject')
export const loginSuccess = makeActionCreator(actionTypes.LOGIN.SUCCESS, 'token', 'payload')
export const loginFailure = makeActionCreator(actionTypes.LOGIN.FAILURE, 'error')
export const logoutRequest = makeActionCreator(actionTypes.LOGOUT.REQUEST)
export const logoutSuccess = makeActionCreator(actionTypes.LOGOUT.SUCCESS)
