import { createStore, applyMiddleware } from 'redux'
import thunkMiddleware from 'redux-thunk'
import createSagaMiddleware from 'redux-saga'
import { routerMiddleware } from 'react-router-redux'

import rootReducer from 'reducers'
import rootSaga from 'sagas'

const sagaMiddleware = createSagaMiddleware()

export default function configureStore(initialState, history) {
  const store = createStore(
    rootReducer,
    initialState,
    applyMiddleware(
      thunkMiddleware,
      routerMiddleware(history),
      sagaMiddleware
    )
  )
  sagaMiddleware.run(rootSaga)
  return store
}
