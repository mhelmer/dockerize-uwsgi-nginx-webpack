import React from 'react'
import ReactDOM from 'react-dom'
import { AppContainer } from 'react-hot-loader'

import configureStore from 'store/configureStore'
import App from 'containers/Root'

const store = configureStore()

const renderApp = AppComponent => {
  ReactDOM.render(
    <AppContainer>
       <AppComponent store={store} />
    </AppContainer>,
    document.getElementById('app')
  )
}

renderApp(App)

if (module.hot) {
  module.hot.accept('./containers/Root', () => {
    renderApp(App)
  })
}
