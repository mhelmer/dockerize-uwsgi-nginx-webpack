import makeActionCreator from './makeActionCreator.js'
import * as actionTypes from '../constants/actionTypes'

export const fetchUsersRequest = makeActionCreator(actionTypes.FETCH_USERS.REQUEST)
export const fetchUsersSuccess = makeActionCreator(actionTypes.FETCH_USERS.SUCCESS, 'payload')
export const fetchUsersFailure = makeActionCreator(actionTypes.FETCH_USERS.FAILURE, 'payload')
