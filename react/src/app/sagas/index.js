import { fork } from 'redux-saga/effects'
import authFlowSaga from './authFlowSaga'

function* rootSaga() {
  yield [
    fork(authFlowSaga),
  ]
}

export default rootSaga
