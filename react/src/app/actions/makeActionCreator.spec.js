import makeActionCreator from './makeActionCreator'

describe('makeActionCreator', () => {
  it('can make actionCreators without payload', () => {
    const actionCreator = makeActionCreator('ACTION_TYPE')
    expect(actionCreator()).toEqual({ type: 'ACTION_TYPE' })
  })
  it('can make actionCreators that maps arg to action property', () => {
    const actionCreator = makeActionCreator('ACTION_TYPE', 'payload')
    expect(actionCreator('some payload')).toEqual({
      type: 'ACTION_TYPE',
      payload: 'some payload',
    })
  })
  it('can make actionCreators with multiple agruments', () => {
    const actionCreator = makeActionCreator('ACTION_TYPE', 'payload', 'meta')
    expect(actionCreator('some payload', 'some meta')).toEqual({
      type: 'ACTION_TYPE',
      payload: 'some payload',
      meta: 'some meta',
    })
  })
})
