import * as actionCreators from './user'

describe('user actionCreators', () => {
  describe('fetchUsersRequest', () => {
    it('returns an action with FETCH_USERS_REQUEST type', () => {
      expect(actionCreators.fetchUsersRequest()).toEqual({
        type: 'FETCH_USERS_REQUEST',
      })
    })
  })
  describe('fetchUsersSuccess', () => {
    it('returns an action with correct type and payload', () => {
      expect(actionCreators.fetchUsersSuccess('some payload')).toEqual({
        type: 'FETCH_USERS_SUCCESS',
        payload: 'some payload',
      })
    })
  })
  describe('fetchUsersFailure', () => {
    it('returns an action with correct type and payload', () => {
      expect(actionCreators.fetchUsersFailure('some payload')).toEqual({
        type: 'FETCH_USERS_FAILURE',
        payload: 'some payload',
      })
    })
  })
})
