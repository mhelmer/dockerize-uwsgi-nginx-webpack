import { compose } from 'redux'

import createFilter, { getByFilter, createEnhancedFilter, enhanceReducers, createFilterReducers } from './createFilter'

describe('Higher order reducers for filters', () => {
  describe('simple reducer', () => {
    const reducer = (state = null, action) => action.type === 'FETCH_FILTER_SUCCESS' ? action.payload
      : state
    describe('createFilter', () => {
      it('should have initial state', () => {
        const filterReducer = createFilter({ ['FILTER_ONE']: reducer })
        const state = [ {} ].reduce(filterReducer, undefined)
        expect(getByFilter(state, { filterName: 'FILTER_ONE' })).toBe(null)
      })
      it('should handle a single filter', () => {
        const FILTER_ONE = 'FILTER_ONE'
        const filterReducer = createFilter({ [FILTER_ONE]: reducer })

        const state = [ {}, {
          type: 'FETCH_FILTER_SUCCESS',
          filterName: FILTER_ONE,
          payload: 'some-payload',
        } ].reduce(filterReducer, undefined)
        expect(getByFilter(state, { filterName: FILTER_ONE })).toBe('some-payload')
      })

      const fetchSuccess = (filterName, payload) => ({
        type: 'FETCH_FILTER_SUCCESS',
        filterName,
        payload,
      })
      it('should handle two filters and initial state', () => {
        const FILTER_ONE = 'FILTER_ONE'
        const FILTER_TWO = 'FILTER_TWO'
        const filterReducer = createFilter({
          [FILTER_ONE]: reducer,
          [FILTER_TWO]: reducer,
        })

        const state = [ {},
          fetchSuccess(FILTER_ONE, 'some-payload'),
        ].reduce(filterReducer, undefined)

        expect(getByFilter(state, { filterName: FILTER_ONE })).toBe('some-payload')
        expect(getByFilter(state, { filterName: FILTER_TWO })).toBe(null)
      })
    })
    describe('enhanceReducers', () => {
      it('should handle a two filters with one enhancer', () => {
        const filterNames = [ 'FILTER_ONE', 'FILTER_TWO' ]
        const enhancer = reducer => (state = {}, action) => ({
          ...state,
          enhanced: reducer(state.enhanced, action),
        })
        const filterReducer = compose(
          createFilter,
          enhanceReducers({ ['FILTER_ONE']: enhancer }),
          createFilterReducers(filterNames)
        )(reducer)

        const state = [ {}, {
          type: 'FETCH_FILTER_SUCCESS',
          filterName: 'FILTER_ONE',
          payload: 'some-payload',
        } ].reduce(filterReducer, undefined)

        expect(getByFilter(state, { filterName: 'FILTER_ONE' }).enhanced).toBe('some-payload')
        expect(getByFilter(state, { filterName: 'FILTER_TWO' })).toBe(null)
      })
    })

    describe('createEnhancedFilter', () => {
      it('should have initial state', () => {
        const filterReducer = createEnhancedFilter([ 'FILTER_ONE' ])(reducer)
        const state = filterReducer(undefined, {})
        expect(getByFilter(state, { filterName: 'FILTER_ONE' })).toBe(null)
      })
      it('should handle a single filter without enhancers', () => {
        const FILTER_ONE = 'FILTER_ONE'
        const filterReducer = createEnhancedFilter([ FILTER_ONE ])(reducer)

        const state = [ {}, {
          type: 'FETCH_FILTER_SUCCESS',
          filterName: FILTER_ONE,
          payload: 'some-payload',
        } ].reduce(filterReducer, undefined)
        expect(getByFilter(state, { filterName: FILTER_ONE })).toBe('some-payload')
      })
      it('should handle a two filters with one enhancer', () => {
        const filters = { FILTER_ONE: 'FILTER_ONE', FILTER_TWO: 'FILTER_TWO' }
        const filterNames = [ filters.FILTER_ONE, filters.FILTER_TWO ]

        const enhancer = reducer => (state = {}, action) => ({
          ...state,
          enhanced: reducer(state.enhanced, action),
        })
        const filterReducer = createEnhancedFilter(filterNames, {
          [filters.FILTER_ONE]: enhancer,
        })(reducer)

        const state = [ {}, {
          type: 'FETCH_FILTER_SUCCESS',
          filterName: filters.FILTER_ONE,
          payload: 'some-payload',
        } ].reduce(filterReducer, undefined)

        expect(getByFilter(state, { filterName: filters.FILTER_ONE }).enhanced).toBe('some-payload')
        expect(getByFilter(state, { filterName: filters.FILTER_TWO })).toBe(null)
      })
    })
  })
})
