import React from 'react'
import ReactDOM from 'react-dom'
import { AppContainer } from 'react-hot-loader'
import { browserHistory } from 'react-router'
import { syncHistoryWithStore } from 'react-router-redux'
import configureStore from './store/configureStore'
import App from './containers/Root'


const store = configureStore()

const history = syncHistoryWithStore(browserHistory, store)

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
