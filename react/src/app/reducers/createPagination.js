import { has } from 'lodash'
import { compose, combineReducers } from 'redux'
import { createReducer } from 'reducers/utils'

const reduceAllKeys = reducer => (state, action) => (
  Object.keys(state).reduce((acc, curr) => {
    acc[curr] = reducer(state[curr], action)
    return acc
  }, {})
)
const createPredicateReducer = (initialState, predicateReducers) => {
  return (state = initialState, action) => {
    const index = predicateReducers.findIndex(({ predicate }) => predicate(action))
    return index !== -1 ? predicateReducers[index].reducer(state, action) : state
  }
}

const withActionFilter = validActionTypes => reducer => (state = reducer(undefined, {}), action) => {
  if (validActionTypes.indexOf(action.type) !== -1) {
    return reducer(state, action)
  }
  return state
}

const reducePage = reducer => (state, action) => ({
  ...state,
  [action.filterQuery.page]: reducer(state[action.filterQuery.page], action),
})
const pageCountReducer = (state, action) => {
  if(action.next === null) {
    return action.filterQuery.page
  }
  return Math.ceil(action.count / action.response.result.length)
}

const count = SUCCESS => createReducer(0, { [SUCCESS]: (state, action) => action.count })
const pageCount = SUCCESS => createReducer(0, { [SUCCESS]: pageCountReducer })
const byPage = INVALIDATE => reducer => createPredicateReducer(
  { [1]: reducer(undefined, {}) },
  [ {
    predicate: action => has(action, 'filterQuery.page'),
    reducer: reducePage(reducer),
  }, {
    predicate: action => action.type === INVALIDATE,
    reducer: reduceAllKeys(reducer),
  } ]
)

const withPagination = ({ SUCCESS, INVALIDATE }) => reducer => combineReducers({
  count: count(SUCCESS),
  pageCount: pageCount(SUCCESS),
  byPage: byPage(INVALIDATE)(reducer),
})

/**
 * Create a higher-order reducer for pagination
 *
 * @param {{ SUCCESS: string, INVALIDATE: string }} actionTypes action types the reducer should listen to
 * @returns {function(reducer: function): function} Higher order reducer
 */
const createPagination = actionTypes => {
  const validActionTypes = Object.keys(actionTypes).map(key => actionTypes[key])

  return compose(
    withActionFilter(validActionTypes),
    withPagination(actionTypes)
  )
}

export const createPaginationSelectors = reducer => ({
  getPageCount: state => state.pageCount,
  getCount: state => state.count,
  getPage: (state, page) => state.byPage[page] || reducer(undefined, {}),
})

export default createPagination
