import React from 'react'
import { Provider } from 'react-redux'
import { Router } from 'react-router'
import DevTools from './DevTools'
import routes from  '../components/Routes.jsx'


const Root = ({ store, history }) => (
  <Provider store={store}>
    <div>
      <Router history={history}>
        { routes }
      </Router>
      { process.env.NODE_ENV !== 'production' ? <DevTools /> : null }
    </div>
  </Provider>
)

export default Root
