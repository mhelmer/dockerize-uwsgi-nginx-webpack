import rootReducer, * as selectors from 'reducers'
import * as authActionCreators from 'actions/auth'
import * as userActionCreators from 'actions/user'

describe('rootReducer', () => {
  describe('getCurrentUser', () => {
    const user = { id: 1, username: 'some user' }
    const state = rootReducer(
      rootReducer(
        undefined,
        authActionCreators.loginSuccess('test-token', { user_id: user.id })
      ),
      userActionCreators.fetchUsersSuccess([ user ])
    )
    it('selects the current user', () => {
      expect(selectors.getCurrentUser(state)).toEqual(user)
    })
  })
})
