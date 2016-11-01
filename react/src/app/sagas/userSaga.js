import { takeEvery } from 'redux-saga'
import { call, put } from 'redux-saga/effects'
import * as actionTypes from '../constants/actionTypes'
import * as actionCreators from '../actions/user'
import * as Api from '../api'

function* fetchUsers(action) {
  try {
    const payload = yield call(Api.fetchUsers)
    yield put(actionCreators.fetchUsersSuccess(payload))
  } catch (e) {
    yield put(actionCreators.fetchUsersFailur(e.message))
  }
}

function* userSaga() {
  yield takeEvery(actionTypes.FETCH_USERS.REQUEST, fetchUsers)
}

export default userSaga
