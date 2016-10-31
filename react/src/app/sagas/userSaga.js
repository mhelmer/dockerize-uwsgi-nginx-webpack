import { takeEvery } from 'redux-saga'
import { call, put } from 'redux-saga/effects'
import * as actionTypes from '../constants/actionTypes'
import * as Api from '../api'

function* fetchUsers(action) {
  try {
    const payload = yield call(Api.fetchUsers)
    yield put({ type: actionTypes.FETCH_USERS.SUCCESS, payload })
  } catch (e) {
    yield put({ type: actionTypes.FETCH_USERS.FAILURE, payload: e.message })
  }
}

function* userSaga() {
  yield takeEvery(actionTypes.FETCH_USERS.REQUEST, fetchUsers)
}

export default userSaga
