import { createIsFetching, createReducer, updateObject } from './utils'

describe('reducer utils', () => {
  describe('createIsFetching', () => {
    const failureAction = { type: 'FAILURE_TYPE' }
    const requestAction = { type: 'REQUEST_TYPE' }
    const successAction = { type: 'SUCCESS_TYPE' }
    const isFetching = createIsFetching({
      FAILURE: failureAction.type,
      REQUEST: requestAction.type,
      SUCCESS: successAction.type,
    })

    it('is not fetching intially', () => {
      expect(isFetching(undefined, {})).toBe(false)
    })
    it('is fetching after requestAction', () => {
      expect(isFetching(false, requestAction)).toBe(true)
    })
    it('is not fetching after failureAction', () => {
      expect(isFetching(true, failureAction)).toBe(false)
    })
    it('is not fetching after successAction', () => {
      expect(isFetching(true, successAction)).toBe(false)
    })
  })
  describe('createReducer', () => {
    it('gives intial state when handlers is empty', () => {
      const reducer = createReducer('initial state', {})
      expect(reducer(undefined, {})).toBe('initial state')
    })
    it('can handle other actions without changing state', () => {
      const reducer = createReducer('initial state', {})
      expect(reducer(undefined, { type: 'OTHER_ACTION' })).toBe('initial state')
    })
    it('can create simple reducer that handles one action', () => {
      const reducer = createReducer('initial state', {
        'ACTION_TYPE': () => 'next state',
      })
      expect(reducer(undefined, {})).toBe('initial state')
      expect(reducer(undefined, { type: 'ACTION_TYPE' })).toBe('next state')
    })
    it('can create reducer that handles action with payload', () => {
      const reducer = createReducer(null, {
        'ACTION_TYPE': (state, action) => action.payload,
      })
      expect(
        reducer(undefined, { type: 'ACTION_TYPE', payload: 'heavy load' })
      ).toBe('heavy load')
    })
    it('can create reducer that handles two actions', () => {
      const reducer = createReducer('initial state', {
        'ACTION_TYPE_1': () => 'state one',
        'ACTION_TYPE_2': () => 'state two',
      })
      expect(reducer(undefined, {})).toEqual('initial state')
      expect(reducer(undefined, { type: 'ACTION_TYPE_1' })).toBe('state one')
      expect(reducer('some state', { type: 'ACTION_TYPE_2' })).toBe('state two')
    })
  })
  describe('updateObject', () => {
    it('updates object without mutating initial object', () => {
      const initialObject = { fooKey: 'foo', barKey: 'bar' }
      const newValues = { barKey: 'baz' }
      const nextObject = updateObject(initialObject, newValues)

      expect(initialObject).toEqual({ fooKey: 'foo', barKey: 'bar' })
      expect(nextObject).toEqual({ fooKey: 'foo', barKey: 'baz' })
    })
  })
})
