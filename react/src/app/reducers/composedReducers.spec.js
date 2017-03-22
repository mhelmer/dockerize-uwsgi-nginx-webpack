import { compose } from 'redux'

import createActionTypes from 'actions/createActionTypes'
import createList, * as fromList from './createList'
import createFilter, { createGetByFilter, createFilterReducers, createEnhancedFilter, getByFilter } from './createFilter'
import { createByFilterQuery, createGetByFilterQuery } from './createByKey'

describe('Compositions of higher-order reducers', () => {
  describe('createEnhancedFilter, createByFilterQuery and createList', () => {
    const actionTypes = createActionTypes('FETCH')
    it('should handle a filter enhanced filterQuery', () => {
      const fetchSuccess = ({ filterName, filterQuery }, payload) => ({
        type: actionTypes.SUCCESS,
        filterName,
        filterQuery,
        response: { result: payload },
      })

      const filters = { FILTER_RELATED: 'FILTER_RELATED', FILTER_OTHER: 'FILTER_OTHER' }
      const filterArray = [ filters.FILTER_RELATED, filters.FILTER_OTHER ]

      const enhance = compose(
        createEnhancedFilter(filterArray, {
          [filters.FILTER_RELATED]: createByFilterQuery('relatedId'),
        }),
        createList
      )
      const reducer = enhance(actionTypes)

      const ids = [ 1, 2, 3, 4, 5, 6, 7, 8, 9, 10 ]
      const filter = {
        filterName: filters.FILTER_RELATED,
        filterQuery: { relatedId: 3 },
      }
      const state = [ {}, fetchSuccess(filter, ids) ].reduce(reducer, undefined)


      const getByFilter = createGetByFilter({
        [filter.filterName]: createGetByFilterQuery('relatedId'),
      })
      const getIds = compose(fromList.getIds, getByFilter)

      expect(getIds(state, filter)).toBe(ids)
    })
  })
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
        const state = [ {},
          fetchSuccess(filters.FILTER_ONE, ids),
        ].reduce(reducer, undefined)

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
        const state = [ {},
          fetchSuccess(filters.FILTER_ONE, ids),
        ].reduce(reducer, undefined)

        expect(fromList.getIds(getByFilter(state, {
          filterName: filters.FILTER_ONE,
        }))).toBe(ids)
      })
    })
  })
})
