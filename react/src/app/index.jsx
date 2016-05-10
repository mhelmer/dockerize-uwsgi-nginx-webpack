import React from 'react'
import { render } from 'react-dom'
import { Router, Route, IndexRoute, browserHistory } from 'react-router'
import { createStore, applyMiddleware } from 'redux'
import thunkMiddleware from 'redux-thunk'
import createLogger from 'redux-logger'
import { Provider } from 'react-redux'
import { syncHistoryWithStore } from 'react-router-redux'
import rootReducer from './reducers/index.js'
import { App, NotFound, Home, Users, User } from './components/index.jsx'

const loggerMiddleware = createLogger()

const store = createStore(
  rootReducer,
  applyMiddleware(
    thunkMiddleware,
    loggerMiddleware
  )
)
const history = syncHistoryWithStore(browserHistory, store)


const routes = (
  <Provider store={store}>
    <Router history={history}>
      <Route path="/" component={App}>
        <IndexRoute component={Home} />
        <Route path="users" component={Users}>
          <Route path=":userId" component={User}/>
        </Route>
        <Route path="*" component={NotFound} />
      </Route>
    </Router>
  </Provider>
)

render(routes, document.getElementById('app'))
