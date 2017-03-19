import { combineReducers } from 'redux'
import { createIds, createIsFetching, createDidInvalidate } from 'reducers/utils'

const createList = actionTypes => combineReducers({
  ids: createIds(actionTypes),
  isFetching: createIsFetching(actionTypes),
  didInvalidate: createDidInvalidate(actionTypes),
})

export default createList

export const getIds = state => state.ids
export const getIsFetching = state => state.isFetching
export const getDidInvalidate = state => state.didInvalidate
