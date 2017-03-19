import { has } from 'lodash'

export const createEnhancerFilter = (filterNames, filterEnhancers = {}) => reducer => {
  const getReducerByFilter = filterName => has(filterEnhancers, filterName) ? filterEnhancers[filterName](reducer)
    : reducer

  const reducers = filterNames.reduce((enhancedReducers, filterName,) => {
    enhancedReducers[filterName] = getReducerByFilter(filterName)
    return enhancedReducers
  }, {})
  return createFilter(reducers)
}

const mapActionToKey = action => action.filterName
const reduceKeyReducer = (mapActionToKey, reducers) => (state, action) => {
  const key = mapActionToKey(action)
  return {
    ...state,
    [key]: reducers[key](state[key], action),
  }
}
const createFilter = filterReducers => {
  const filterPredicate = action => has(action, 'filterName') && filterReducers.hasOwnProperty(action.filterName)
  const initialState = Object.keys(filterReducers).reduce((nextState, filterName) => {
    nextState[filterName] = filterReducers[filterName](undefined, {})
    return nextState
  }, {})

  return (state = initialState, action) => {
    if(filterPredicate(action)) {
      return reduceKeyReducer(mapActionToKey, filterReducers)(state, action)
    }
    return state
  }
}

export default createFilter
