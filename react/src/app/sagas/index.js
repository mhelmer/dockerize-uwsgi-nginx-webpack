import { takeEvery, takeLatest } from 'redux-saga'
import { call, put } from 'redux-saga/effects'
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

function* rootSaga() {
  yield* takeEvery(actionTypes.LOGIN_REQUEST, authProcedure)
}

export default rootSaga
