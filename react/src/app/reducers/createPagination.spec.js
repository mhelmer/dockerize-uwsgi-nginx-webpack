import createPagination, { createPaginationSelectors } from './createPagination'
import { createReducer } from 'reducers/utils'

describe('createPagination', () => {
  describe('pagination of simple reducer', () => {
    const actionTypes = {
      SUCCESS: 'PAGE_SUCCESS',
      REQUEST: 'PAGE_REQUEST',
      FAILURE: 'PAGE_FAILURE',
      INVALIDATE: 'PAGE_INVALIDATE',
    }
    const pageSuccess = ({ page, count, next = null, result }) => ({
      type: actionTypes.SUCCESS,
      filterQuery: { page },
      count,
      next,
      response: { result },
    })
    const invalidatePage = () => ({
      type: actionTypes.INVALIDATE,
    })

    const reducer = createReducer({ result: null, didInvalidate: false }, {
      [actionTypes.SUCCESS]: (state, action) => ({ ...state, result: action.response.result, didInvalidate: false }),
      [actionTypes.INVALIDATE]: state => ({ ...state, didInvalidate: true }),
    })

    const pagination = createPagination(actionTypes)(reducer)
    const selectors = createPaginationSelectors(reducer)

    it('should return intitial page count', () => {
      expect(selectors.getPageCount(pagination(undefined, {}))).toBe(0)
    })
    it('should return page count as the last page', () => {
      const state = pagination(undefined, pageSuccess({ page: 5, count: 100, result: [] }))
      expect(selectors.getPageCount(state)).toBe(5)
      expect(selectors.getCount(state)).toBe(100)
    })
    it('should return correct page count when not on last page', () => {
      const state = pagination(
        undefined,
        pageSuccess({ page: 3, count: 60, next: '/api/?page=4', result: [ 1, 2, 3, 4, 5, 6, 7, 8, 9, 10 ] })
      )
      expect(selectors.getPageCount(state)).toBe(6)
      expect(selectors.getCount(state)).toBe(60)
    })
    it('should return correct page in selector', () => {
      const result = [ 1, 2, 3, 4, 5, 6, 7, 8, 9, 10 ]
      const state = pagination(
        undefined,
        pageSuccess({ page: 2, count: 60, next: '/api/?page=3', result })
      )
      expect(selectors.getPage(state, 2).result).toEqual(result)
      expect(selectors.getCount(state)).toBe(60)
    })
    it('should invalidate all pages', () => {
      const result1 = [ 1, 2, 3, 4, 5, 6, 7, 8, 9, 10 ]
      const result2 = [ 11, 12, 13, 14, 15, 16, 17, 18, 19, 20 ]

      const state = [
        pageSuccess({ page: 1, count: 20, next: '/api/?page=2', result: result1 }),
        pageSuccess({ page: 2, count: 20, next: null, result: result2 }),
      ].reduce(pagination, undefined)

      expect(selectors.getPage(state, 2).result).toEqual(result2)
      expect(selectors.getCount(state)).toBe(20)

      const invalidatedState = pagination(state, invalidatePage())
      expect(selectors.getPage(invalidatedState, 1).didInvalidate).toBe(true)
      expect(selectors.getPage(invalidatedState, 2).didInvalidate).toBe(true)
    })
  })
})
