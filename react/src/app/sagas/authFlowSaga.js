import { delay } from 'redux-saga'
import { call, put, take, race } from 'redux-saga/effects'
import * as actionTypes from '../constants/actionTypes'
import * as actionCreators from '../actions/auth'
import jwtDecode from 'jwt-decode'
import * as Api from '../api'
import * as Storage from '../storage'

function* authenticate(token, loginAction) {
  try {
    const json = yield token ? call(Api.tokenRefresh, { token })
      : call(Api.authenticate, loginAction.values)

    if(!token) {
      yield call(loginAction.resolve, json)
    }
    yield call(Storage.setAuthToken, json.token)
    yield put(actionCreators.loginSuccess(json.token, jwtDecode(json.token)))
    return json.token
  } catch (e) {
    if (!token) {
      yield call(loginAction.reject, e.message)
    }
    yield call(Storage.removeAuthToken)
    yield put(actionCreators.loginFailure(e.message))
    return null
  }
}

const timeUntilRefresh = token => Math.max((jwtDecode(token).exp * 1000 - Date.now()) / 2, 0)

function* authLoop({ token, loginAction }) {
  for(;;) {
    token = yield call(authenticate, token, loginAction)
    if (token == null) {
      return
    }
    yield call(delay, timeUntilRefresh(token))
  }
}

function* logout() {
  yield call(Storage.removeAuthToken)
  yield put(actionCreators.logoutSuccess())
}

function* authFlowSaga() {
  for(;;) {
    const token = yield call(Storage.getAuthToken)
    let loginAction
    if (!token) {
      loginAction = yield take(actionTypes.LOGIN.REQUEST)
    } else {
      yield put(actionCreators.loginRequest())
    }

    const { logoutAction } = yield race({
      authLoop: call(authLoop, { token, loginAction }),
      logoutAction: take(actionTypes.LOGOUT.REQUEST),
    })
    if(logoutAction) {
      yield call(logout)
    }
  }
}

export default authFlowSaga
