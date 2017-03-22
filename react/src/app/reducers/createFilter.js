import { has } from 'lodash'
import { compose } from 'redux'
import createByKey, { createGetByKey } from 'reducers/createByKey'

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

export const createEnhancedFilter = (filterNames, filterEnhancers = {}) => {
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

const withInitialState = initialState => reducer => {
  return (state = initialState, action) => reducer(state, action)
}

const mapToReducer = mapActionToKey => reducers => (state, action) => {
  return reducers[mapActionToKey(action)](state, action)
}

const combineInitialStates = reducers => Object.keys(reducers).reduce(
  (initialState, reducerKey) => {
    initialState[reducerKey] = reducers[reducerKey](undefined, {})
    return initialState
  },
  {}
)

const mapActionToKey = action => action.filterName

const createFilter = filterReducers => {
  const filterPredicate = action => has(action, 'filterName') && has(filterReducers, action.filterName)
  const initialState = combineInitialStates(filterReducers)

  return compose(
    withInitialState(initialState),
    createByKey(filterPredicate, mapActionToKey),
    mapToReducer(mapActionToKey)
  )(filterReducers)
}

export default createFilter

export const getByFilter = createGetByKey(({ filterName }) => filterName)
export const createGetByFilter = (selectors = {}) => (state, filterArgs, ...args) => {
  const filterState = getByFilter(state, filterArgs)
  return has(selectors, filterArgs.filterName) ? selectors[filterArgs.filterName](filterState, filterArgs, ...args)
    : filterState
}
