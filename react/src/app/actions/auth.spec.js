import * as actionCreators from './auth'

describe('auth actionCreators', () => {
  describe('loginRequest', () => {
    it('returns an action with LOGIN_REQUEST type', () => {
      expect(actionCreators.loginRequest({ username: 'user', password: 'password' }, 'resolve', 'reject')).toEqual({
        type: 'LOGIN_REQUEST',
        values: { username: 'user', password: 'password' },
        resolve: 'resolve',
        reject: 'reject',
      })
    })
  })
  describe('loginSuccess', () => {
    it('returns an action with correct type and payload', () => {
      expect(actionCreators.loginSuccess('some-token', 'some payload')).toEqual({
        type: 'LOGIN_SUCCESS',
        token: 'some-token',
        payload: 'some payload',
      })
    })
  })
  describe('loginFailure', () => {
    it('returns an action with correct type and payload', () => {
      expect(actionCreators.loginFailure('some error')).toEqual({
        type: 'LOGIN_FAILURE',
        error: 'some error',
      })
    })
  })
})
