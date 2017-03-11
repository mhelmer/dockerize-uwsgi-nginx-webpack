import React from 'react'
import { Provider } from 'react-redux'

import DevTools from './DevTools'
import App from 'components/index.js'


const Root = ({ store, history }) => (
  <Provider store={store}>
    <div>
      <App history={history} />
      <DevTools />
    </div>
  </Provider>
)

export default Root
