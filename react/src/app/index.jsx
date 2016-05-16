import React from 'react'
import { render } from 'react-dom'
import { Router, Route, IndexRoute, browserHistory } from 'react-router'
import { Provider } from 'react-redux'
import { syncHistoryWithStore } from 'react-router-redux'
import DevTools from './containers/DevTools'
import { App, NotFound, Home, Users, User } from './components/index.jsx'
import { loadAuthFromStorage }  from './actions/auth'
import configureStore from './store/configureStore'

const store = configureStore()

const history = syncHistoryWithStore(browserHistory, store)

const onEnter = (nextState, replace, callback) => {
  store.dispatch(loadAuthFromStorage())
  callback()
}

const routes = (
  <Provider store={store}>
    <div>
      <Router history={history}>
        <Route path="/" component={App} onEnter={onEnter}>
          <IndexRoute component={Home} />
          <Route path="users" component={Users}>
            <Route path=":userId" component={User}/>
          </Route>
          <Route path="*" component={NotFound} />
        </Route>
      </Router>
      { process.env.NODE_ENV !== 'production' ? <DevTools /> : null }
    </div>
  </Provider>
)

render(routes, document.getElementById('app'))
