import { has } from 'lodash'

const createFilter = (filterNames, filterEnhancers = {}) => reducer => {
  const getReducerByFilter = filterName => has(filterEnhancers, filterName) ? filterEnhancers[filterName](reducer)
    : reducer

  const initialState = filterNames.reduce((nextState, filterName) => {
    nextState[filterName] = getReducerByFilter(filterName)(undefined, {})
    return nextState
  }, {})

  return (state = initialState, action) => {
    if (has(action, 'filterName') && filterNames.indexOf(action.filterName) !== -1) {
      return ({
        ...state,
        [action.filterName]: getReducerByFilter(action.filterName)(state[action.filterName], action),
      })
    }
    return state
  }
}

export default createFilter
