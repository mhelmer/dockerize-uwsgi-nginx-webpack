import React from 'react'
import { Provider } from 'react-redux'

import App from 'components'


const Root = ({ store, history }) => (
  <Provider store={store}>
    <div>
      <App history={history} />
    </div>
  </Provider>
)

export default Root
