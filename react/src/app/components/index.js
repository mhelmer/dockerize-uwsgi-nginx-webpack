import React from 'react'
import { ConnectedRouter as Router } from 'react-router-redux'

import Routes from './Routes'

const App = ({ history }) => (
  <Router history={history}>
    <Routes />
  </Router>
)

export default App
