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

      const state = [ {}, {
        type: 'FETCH_SUCCESS',
        filterKey: 4,
        payload: 'some-payload',
      } ].reduce(byKeyReducer, undefined)
      expect(getByKey(state, { filterKey: 4 })).toBe('some-payload')
    })
  })
  describe('createByFilterQuery', () => {
    it('should create a simple byFilterQuery reducer', () => {
      const byKeyReducer = createByFilterQuery('someKey')(reducer)
      const getByFilterQuery = createGetByFilterQuery('someKey')

      const state = [ {}, {
        type: 'FETCH_SUCCESS',
        filterQuery: { someKey: 4 },
        payload: 'some-payload',
      } ].reduce(byKeyReducer, undefined)
      expect(getByFilterQuery(state, { filterQuery: { someKey: 4 } })).toBe('some-payload')

    })
  })
})
