import createFilter, { createEnhancerFilter } from './createFilter'

describe('createFilter', () => {
  describe('simple reducer', () => {
    const reducer = (state = null, action) => action.type === 'FETCH_FILTER_SUCCESS' ? action.payload
      : state

    it('should have initial state', () => {
      const filterReducer = createEnhancerFilter([ 'FILTER_ONE' ])(reducer)
      const state = filterReducer(undefined, {})
      expect(state['FILTER_ONE']).toBe(null)

    })
    it('should handle a single filter without enhancers', () => {
      const FILTER_ONE = 'FILTER_ONE'
      const filterReducer = createFilter({
        [FILTER_ONE]: reducer,
      })

      const state = filterReducer(undefined, {
        type: 'FETCH_FILTER_SUCCESS',
        filterName: FILTER_ONE,
        payload: 'some-payload',
      })
      expect(state['FILTER_ONE']).toBe('some-payload')
    })
    it('should handle a single filter with enhancer', () => {
      const filterNames = [ 'FILTER_ONE' ]
      const enhancer = reducer => (state = {}, action) => ({
        ...state,
        enhanced: reducer(state.enhanced, action),
      })
      const filterReducer = createEnhancerFilter(filterNames, { ['FILTER_ONE']: enhancer })(reducer)

      const state = filterReducer(undefined, {
        type: 'FETCH_FILTER_SUCCESS',
        filterName: 'FILTER_ONE',
        payload: 'some-payload',
      })
      expect(state['FILTER_ONE'].enhanced).toBe('some-payload')
    })
  })
})
