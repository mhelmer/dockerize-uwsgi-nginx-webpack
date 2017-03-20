import createByKey, { createGetByKey, createByFilterQuery, createGetByFilterQuery } from './createByKey'

describe('createByKey module', () => {
  const reducer = (state = null, action) => action.type === 'FETCH_SUCCESS' ? action.payload
    : state
  describe('createByKey', () => {
    it('should create a simple byKey reducer', () => {
      const byKeyReducer = createByKey(
        action => action.hasOwnProperty('filterKey'),
        action => action.filterKey
      )(reducer)
      const getByKey = createGetByKey(({ filterKey }) => filterKey)

      const successState = byKeyReducer(undefined, {
        type: 'FETCH_SUCCESS',
        filterKey: 4,
        payload: 'some-payload',
      })
      expect(getByKey(successState, { filterKey: 4 })).toBe('some-payload')

    })
  })
  describe('createByKey', () => {
    it('should create a simple byKey reducer', () => {
      const byKeyReducer = createByFilterQuery('someKey')(reducer)
      const getByFilterQuery = createGetByFilterQuery('someKey')

      const state = byKeyReducer(undefined, {
        type: 'FETCH_SUCCESS',
        filterQuery: { someKey: 4 },
        payload: 'some-payload',
      })
      expect(getByFilterQuery(state, { filterQuery: { someKey: 4 } })).toBe('some-payload')

    })
  })
})
