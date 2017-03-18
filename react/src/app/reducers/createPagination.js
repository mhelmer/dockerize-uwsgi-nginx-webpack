import { has } from 'lodash'
import { combineReducers } from 'redux'
import { createReducer } from 'reducers/utils'

const reduceAllKeys = reducer => (state, action) => (
  Object.keys(state).reduce((acc, curr) => {
    acc[curr] = reducer(state[curr], action)
    return acc
  }, {})
)

const withActionFilter = predicate => reducer => (state = reducer(undefined, {}), action) => {
  if (predicate(action)) {
    return reducer(state, action)
  }
  return state
}

const createPagination = actionTypes => reducer => {
  const validActionTypes = Object.keys(actionTypes).map(key => actionTypes[key])

  const pageCount = createReducer(0, {
    [actionTypes.SUCCESS]: (state, action) => action.next === null ? action.filterQuery.page
      : Math.ceil(action.count / action.response.result.length),
  })
  const byPage = (state = { [1]: reducer(undefined, {}) }, action) => {
    if(has(action, 'filterQuery.page')) {
      return { ...state, [action.filterQuery.page]: reducer(state[action.filterQuery.page], action) }
    }
    if(action.type === actionTypes.INVALIDATE) {
      return reduceAllKeys(reducer)(state, action)
    }
    return state
  }
  const count = (state = 0, action) => has(action, 'count') ? action.count : state

  const pagination = combineReducers({
    pageCount,
    byPage,
    count,
  })

  const getIsMatchingType = action => validActionTypes.indexOf(action.type) !== -1

  return withActionFilter(getIsMatchingType)(pagination)
}

export const createPaginationSelectors = (reducer) => ({
  getPageCount: state => state.pageCount,
  getCount: state => state.count,
  getPage: (state, page) => state.byPage[page] || reducer(undefined, {}),
})

export default createPagination
