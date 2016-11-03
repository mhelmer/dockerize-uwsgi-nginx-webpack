import createActionTypes from './createActionTypes'

describe('createActionTypes', () => {
  it('creates failure, request and success ActionTypes', () => {
    const ACTION_TYPE = createActionTypes('ACTION_TYPE')
    expect(ACTION_TYPE.FAILURE).toBe('ACTION_TYPE_FAILURE')
    expect(ACTION_TYPE.REQUEST).toBe('ACTION_TYPE_REQUEST')
    expect(ACTION_TYPE.SUCCESS).toBe('ACTION_TYPE_SUCCESS')
  })
})
