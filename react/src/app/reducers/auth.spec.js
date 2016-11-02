import auth, * as selectors from './auth'
import * as actionCreators from '../actions/auth'

describe('auth reducer', () => {
  describe('initial state', () => {
    const state = auth(undefined, {})
    it('is not fetching', () => {
      expect(selectors.getIsFetching(state)).toEqual(false)
    })
    it('is not authenticated', () => {
      expect(selectors.getIsAuthenticated(state)).toEqual(false)
    })
  })
  describe('login request', () => {
    it('is fetching', () => {
      const state = auth(undefined, actionCreators.loginRequest())
      expect(selectors.getIsFetching(state)).toEqual(true)
    })
  })
  describe('login failure', () => {
    const state = auth(
      auth(undefined, actionCreators.loginRequest()),
      actionCreators.loginFailure()
    )
    it('is not fetching', () => {
      expect(selectors.getIsFetching(state)).toEqual(false)
    })
    it('is not authenticated', () => {
      expect(selectors.getIsAuthenticated(state)).toEqual(false)
    })
  })
  describe('login success', () => {
    const state = auth(undefined, actionCreators.loginSuccess('test-token', { user_id: 'some-user' }))
    it('is authenticated', () => {
      expect(selectors.getIsAuthenticated(state)).toBe(true)
    })
    it('is not fetching', () => {
      expect(selectors.getIsFetching(state)).toBe(false)
    })
    it('has userId from action payload', () => {
      expect(selectors.getUserId(state)).toBe('some-user')
    })
  })
  describe('logout success', () => {
    const state = auth(
      auth(undefined, actionCreators.loginSuccess('t', {})),
      actionCreators.logoutSuccess()
    )
    it('is not authenticated', () => {
      expect(selectors.getIsAuthenticated(state)).toBe(false)
    })
    it('has no userId', () => {
      expect(selectors.getUserId(state)).toBe(null)
    })
  })
})
