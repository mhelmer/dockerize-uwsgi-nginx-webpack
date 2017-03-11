import React from 'react'
import { Router } from 'react-router'

import routes from './Routes'

const App = ({ history }) => (
  <Router history={history}>
    { routes }
  </Router>
)
export default App
