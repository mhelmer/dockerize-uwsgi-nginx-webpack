import React from 'react'
import ReactDOM from 'react-dom'
import { AppContainer } from 'react-hot-loader'
import createHistory from 'history/createBrowserHistory'

import configureStore from 'store/configureStore'
import App from 'containers/Root'


const history = createHistory()
const store = configureStore(undefined, history)

const renderApp = AppComponent => {
  ReactDOM.render(
    <AppContainer>
       <AppComponent store={store} history={history} />
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
