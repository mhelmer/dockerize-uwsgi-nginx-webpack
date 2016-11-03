import users, * as selectors from './users'
import * as actionCreators from '../actions/user'

describe('user reducer', () => {
  describe('initial state', () => {
    const state = users(undefined, {})
    it('is not fetching', () => {
      expect(selectors.getIsFetching(state)).toEqual(false)
    })
    it('has no users', () => {
      expect(selectors.getAll(state)).toEqual([])
    })
  })
  describe('fetch users request', () => {
    it('is fetching', () => {
      const state = users(undefined, actionCreators.fetchUsersRequest())
      expect(selectors.getIsFetching(state)).toEqual(true)
    })
  })
  describe('fetch users failure', () => {
    it('is not fetching', () => {
      const state = users(
        users(undefined, actionCreators.fetchUsersRequest()),
        actionCreators.fetchUsersFailure()
      )
      expect(selectors.getIsFetching(state)).toEqual(false)
    })
  })
  describe('fetch users success', () => {
    const state = users(undefined, actionCreators.fetchUsersSuccess([{ id: 1, username: 'username' }]))

    it('is not fetching', () => {
      expect(selectors.getIsFetching(state)).toEqual(false)
    })
    it('has one user', () => {
      expect(selectors.getAll(state).length).toBe(1)
    })
  })
})
