import { combineReducers } from 'redux'

import * as actionTypes from 'constants/actionTypes'
import { createReducer, createIsFetching } from 'reducers/utils'

const isFetching = createIsFetching(actionTypes.FETCH_USERS)

const items = createReducer([], {
  [actionTypes.FETCH_USERS.SUCCESS]: (state, action) => action.payload,
})

const users = combineReducers({
  isFetching,
  items,
})

export default users

export const getAll = state => state.items
export const getUser = (state, id) => state.items.find(user => user.id === id)
export const getIsFetching = state => state.isFetching
