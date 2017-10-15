import React from 'react'
import { BrowserRouter as Router } from 'react-router-dom'

import Routes from './Routes'

const App = ({ history }) => (
  <Router history={history}>
    <Routes />
  </Router>
)

export default App
