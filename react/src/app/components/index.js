import React from 'react'
import { connect } from 'react-redux'
import { Router } from 'react-router'
import routes from './Routes.jsx'
import { getAllUsers } from '../reducers'

const App = ({ history }) => (
  <Router history={history}>
    { routes }
  </Router>
)
export default App
