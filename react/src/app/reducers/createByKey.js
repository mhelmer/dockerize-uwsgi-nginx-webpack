import { has } from 'lodash'

const createByKey = (predicate, mapActionToKey) => reducer => {
  return (state = {}, action) => {
    if (predicate(action)) {
      const key = mapActionToKey(action)
      return { ...state, [key]: reducer(state[key], action) }
    }
    return state
  }
}
export default createByKey

export const createGetByKey = mapFilterToKey => {
  return (state, filter) => state[mapFilterToKey(filter)]
}

export const createByFilterQuery = filterQueryKey => {
  const predicate = action => has(action, `filterQuery.${filterQueryKey}`)
  const mapActionToKey = action => action.filterQuery[filterQueryKey]
  return createByKey(predicate, mapActionToKey)
}
export const createGetByFilterQuery = filterQueryKey => {
  return createGetByKey(({ filterQuery }) => filterQuery[filterQueryKey])
}
