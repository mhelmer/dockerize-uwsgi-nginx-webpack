import { compose } from 'redux'

import createList, * as fromList from './createList'
import createFilter, { createFilterReducers, getByFilter } from './createFilter'

describe('Compositions of higher-order reducers', () => {
  describe('filters and createList', () => {
    const actionTypes = {
      SUCCESS: 'FETCH_SUCCESS',
      FAILURE: 'FETCH_FAILURE',
      REQUEST: 'FETCH_REQUEST',
      INVALIDATE: 'FETCH_INVALIDATE',
    }
    const fetchSuccess = (filterName, payload) => ({
      type: actionTypes.SUCCESS,
      filterName,
      response: { result: payload },
    })

    describe('createFilter and createList', () => {
      it('should use the correct filter reducer', () => {
        const filters = { FILTER_ONE: 'FILTER_ONE', FILTER_TWO: 'FILTER_TWO' }

        const list = createList(actionTypes)
        const reducer = createFilter({
          [filters.FILTER_ONE]: list,
          [filters.FILTER_TWO]: list,
        })

        const ids = [ 1, 2, 3, 4, 5, 6, 7, 8, 9, 10 ]
        const state = reducer(undefined, fetchSuccess(filters.FILTER_ONE, ids))

        const filterOne = getByFilter(state, { filterName: filters.FILTER_ONE })
        const filterTwo = getByFilter(state, { filterName: filters.FILTER_TWO })

        expect(fromList.getIds(filterOne)).toBe(ids)
        expect(fromList.getIds(filterTwo).length).toBe(0)
      })

    })
    describe('createFilterReducers, createFilter and createList', () => {
      it('should use the correct filter reducer', () => {
        const filters = { FILTER_ONE: 'FILTER_ONE', FILTER_TWO: 'FILTER_TWO' }
        const filterArray = [ filters.FILTER_ONE, filters.FILTER_TWO ]

        const enhance = compose(
          createFilter,
          createFilterReducers(filterArray),
          createList
        )
        const reducer = enhance(actionTypes)

        const ids = [ 1, 2, 3, 4, 5, 6, 7, 8, 9, 10 ]
        const state = reducer(undefined, fetchSuccess(filters.FILTER_ONE, ids))

        expect(fromList.getIds(getByFilter(state, {
          filterName: filters.FILTER_ONE,
        }))).toBe(ids)
      })
    })
  })
})
