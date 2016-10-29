import { takeEvery, takeLatest } from 'redux-saga'
import { call, put, fork } from 'redux-saga/effects'
import * as actionTypes from '../constants/actionTypes'
import * as actionCreators from '../actions/auth'
import jwtDecode from 'jwt-decode'
import * as Api from '../api'
import * as Storage from '../storage'

function* authProcedure({ values, resolve, reject }) {
  try {
    const json = yield call(Api.authenticate, values.username, values.password)
    yield call(Storage.setAuthToken, json.token)
    resolve(json)
    yield put(actionCreators.loginSuccess(json.token, jwtDecode(json.token)))
  } catch (e) {
    reject(e.message)
    yield put(actionCreators.loginFailure(e.message))
  }
}
function* watchLogin() {
  yield* takeEvery(actionTypes.LOGIN_REQUEST, authProcedure)
}

function* loadAuth() {
  try {
    const token = yield call(Storage.getAuthToken)
    yield put(actionCreators.loginSuccess(token, jwtDecode(token)))
  } catch (e) {
    yield call(Storage.removeAuthToken)
  }
}
function* watchLoadAuth() {
  yield* takeEvery(actionTypes.LOAD_AUTH, loadAuth)
}

function* logout (username, password) {
  yield call(Storage.removeAuthToken)
  yield put(actionCreators.logoutSuccess())
}
function* watchLogout() {
  yield* takeEvery(actionTypes.LOGOUT_REQUEST, logout)
}

function* rootSaga() {
  yield [
    fork(watchLoadAuth),
    fork(watchLogin),
    fork(watchLogout),
  ]
}

export default rootSaga
