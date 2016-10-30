import React from 'react'
import { render } from 'react-dom'
import { AppContainer } from 'react-hot-loader'
import { browserHistory } from 'react-router'
import { syncHistoryWithStore } from 'react-router-redux'
import configureStore from './store/configureStore'
import { loadAuthFromStorage }  from './actions/auth'
import App from './containers/Root.js'


const store = configureStore()

const history = syncHistoryWithStore(browserHistory, store)

render(<AppContainer>
  <App store={store} history={history} />
</AppContainer>, document.getElementById('app'))

if (module.hot) {
  module.hot.accept('./containers/Root.js', () => {
    const NextApp = require('./containers/Root.js').default
     render(
       <AppContainer>
         <NextApp store={store} history={history} />
       </AppContainer>,
       document.getElementById('app')
     )
   })
 }
