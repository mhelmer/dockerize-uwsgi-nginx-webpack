import React from 'react'
import { connect } from 'react-redux'
import { login, logout } from '../actions/auth.js'

const Login = ({ handleClick }) => (
  <button onClick={() => handleClick('username', 'password')}>Login</button>
)

const Logout = ({ handleClick }) => (
  <button onClick={() => handleClick()}>Logout</button>
)


const LoginLogout = ({ isAuthenticated, handleLogin, handleLogout }) => (
  <div>
    { isAuthenticated ? <Logout handleClick={handleLogout} /> : <Login handleClick={handleLogin} /> }
  </div>
)

export const AuthPanel = connect(
  (state) => ({
    isAuthenticated: state.auth.isAuthenticated
  }),
  (dispatch) => ({
    handleLogin: (username, password) => dispatch(login(username, password)),
    handleLogout: () => dispatch(logout())
  })
)(LoginLogout)
