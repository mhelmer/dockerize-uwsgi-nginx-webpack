import { createStore, applyMiddleware } from 'redux'
import thunkMiddleware from 'redux-thunk'
import createSagaMiddleware from 'redux-saga'

import rootReducer from 'reducers'
import rootSaga from 'sagas'

const sagaMiddleware = createSagaMiddleware()

export default function configureStore(initialState) {
  const store = createStore(
    rootReducer,
    initialState,
    applyMiddleware(
      thunkMiddleware,
      sagaMiddleware
    )
  )
  sagaMiddleware.run(rootSaga)
  return store
}
