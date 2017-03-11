import { fork } from 'redux-saga/effects'

import authFlowSaga from './authFlowSaga'
import userSaga from './userSaga'

function* rootSaga() {
  yield [
    fork(authFlowSaga),
    fork(userSaga),
  ]
}

export default rootSaga
