import createList, * as selectors from './createList'

describe('createList', () => {
  const actionTypes = {
    SUCCESS: 'FETCH_SUCCESS',
    FAILURE: 'FETCH_FAILURE',
    REQUEST: 'FETCH_REQUEST',
    INVALIDATE: 'FETCH_INVALIDATE',
  }
  const fetchSuccess = ids => ({
    type: actionTypes.SUCCESS,
    response: { result: ids },
  })
  it('should return initialState', () => {
    const list = createList(actionTypes)
    const state = list(undefined, {})

    expect(selectors.getIds(state).length).toBe(0)
    expect(selectors.getIsFetching(state)).toBe(false)
    expect(selectors.getDidInvalidate(state)).toBe(false)
  })
  it('should return correct ids on success', () => {
    const list = createList(actionTypes)
    const ids = [ 1, 2, 3 ]
    const state = [ {}, fetchSuccess(ids) ].reduce(list, undefined)

    expect(selectors.getIds(state)).toBe(ids)
    expect(selectors.getIsFetching(state)).toBe(false)
    expect(selectors.getDidInvalidate(state)).toBe(false)
  })
})
