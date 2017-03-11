import { call, put } from 'redux-saga/effects'

import * as actionCreators from 'actions/user'
import * as Api from 'api'
import { fetchUsers } from './userSaga'

describe('userSaga', () => {
  describe('fetchUsers', () => {
    it('calls fetchUsers API', () => {
      const generator = fetchUsers()
      const next = generator.next()
      expect(next.value).toEqual(call(Api.fetchUsers))
    })
    it('puts success action on successful API call', () => {
      const generator = fetchUsers()
      generator.next()
      const payload = [ { id: 1, username: 'freddy' } ]

      const next = generator.next(payload)

      expect(next.value).toEqual(put(actionCreators.fetchUsersSuccess(payload)))
      expect(generator.next().done).toBe(true)
    })
    it('puts failure action when API call throws', () => {
      const generator = fetchUsers()
      generator.next()

      const next = generator.throw(new function () { this.message = 'some message' })

      expect(next.value).toEqual(put(actionCreators.fetchUsersFailure('some message')))
      expect(generator.next().done).toBe(true)
    })
  })
})
