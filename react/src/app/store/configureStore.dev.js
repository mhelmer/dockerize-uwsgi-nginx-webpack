import { createStore, applyMiddleware, compose } from 'redux'
import thunkMiddleware from 'redux-thunk'
import createLogger from 'redux-logger'
import createSagaMiddleware from 'redux-saga'
import { routerMiddleware } from 'react-router-redux'


import DevTools from 'containers/DevTools'
import rootReducer from 'reducers'
import rootSaga from 'sagas'

const loggerMiddleware = createLogger()
const sagaMiddleware = createSagaMiddleware()

export default function configureStore(initialState, history) {
  const enhancer = compose(
    applyMiddleware(
      thunkMiddleware,
      loggerMiddleware,
      routerMiddleware(history),
      sagaMiddleware
    ),
    DevTools.instrument()
  )

  const store = createStore(
    rootReducer,
    initialState,
    enhancer
  )
  sagaMiddleware.run(rootSaga)

  if (module.hot) {
    module.hot.accept('../reducers', () =>
      store.replaceReducer(require('../reducers').default)
    )
  }

  return store
}
