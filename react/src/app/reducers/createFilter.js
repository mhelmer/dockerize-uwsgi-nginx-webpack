import { has } from 'lodash'
import { compose } from 'redux'

export const enhanceReducers = (enhancers = {}) => reducers => {
  const finalReducers = Object.keys(reducers).filter(
    reducerKey => has(enhancers, reducerKey)
  ).reduce(
    (enhancedReducers, reducerKey) => {
      enhancedReducers[reducerKey] = enhancers[reducerKey](reducers[reducerKey])
      return enhancedReducers
    },
    { ...reducers }
  )
  return finalReducers
}

export const createEnhancerFilter = (filterNames, filterEnhancers = {}) => {
  return compose(
    createFilter,
    enhanceReducers(filterEnhancers),
    createFilterReducers(filterNames)
  )
}

export const createFilterReducers = filterNames => reducer => {
  return filterNames.reduce((reducers, filterName) => {
    reducers[filterName] = reducer
    return reducers
  }, {})
}

const combineInitialStates = reducers => Object.keys(reducers).reduce(
  (initialState, reducerKey) => {
    initialState[reducerKey] = reducers[reducerKey](undefined, {})
    return initialState
  },
  {}
)

// we can re-use createByKey here somehow, but we need to pass initialState
const createKeyReducer = (mapActionToKey, reducers) => (state, action) => {
  const key = mapActionToKey(action)
  return {
    ...state,
    [key]: reducers[key](state[key], action),
  }
}

const mapActionToKey = action => action.filterName

const createFilter = filterReducers => {
  const filterPredicate = action => has(action, 'filterName') && has(filterReducers, action.filterName)
  const filterReducer = createKeyReducer(mapActionToKey, filterReducers)
  const initialState = combineInitialStates(filterReducers)
  return (state = initialState, action) => {
    if (filterPredicate(action)) {
      return filterReducer(state, action)
    }
    return state
  }
}

export default createFilter

export const getByFilter = (state, { filterName }) => state[filterName]
export const createGetByFilter = (selectors = {}) => (state, filterArgs, ...args) => {
  const filterState = getByFilter(state, filterArgs)
  return has(selectors, filterArgs.filterName) ? selectors[filterArgs.filterName](filterState, filterArgs, ...args)
    : filterState
}
