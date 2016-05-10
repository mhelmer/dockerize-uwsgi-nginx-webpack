import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
import { reduxForm } from 'redux-form'
import { login, logout } from '../actions/auth.js'

const submit = (values, dispatch) => dispatch(login(values.username, values.password))

const SubmitValidationForm = ({ fields: {username, password}, error, resetForm, handleSubmit, submitting }) => (
  <form onSubmit={handleSubmit(submit)}>
    <div>
      <label>Username</label>
      <div>
        <input type="text" placeholder="Username" {...username}/>
      </div>
      {username.touched && username.error && <div>{username.error}</div>}
    </div>
    <div>
      <label>Password</label>
      <div>
        <input type="password" placeholder="Password" {...password}/>
      </div>
      {password.touched && password.error && <div>{password.error}</div>}
    </div>
    {error && <div>{error}</div>}
    <div>
      <button type="submit" disabled={submitting}>
        {submitting ? <i/> : <i/>} Log In
      </button>
      <button type="button" disabled={submitting} onClick={resetForm}>
        Clear Values
      </button>
    </div>
  </form>
)

SubmitValidationForm.propTypes = {
  fields: PropTypes.object.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  error: PropTypes.string,
  resetForm: PropTypes.func.isRequired,
  submitting: PropTypes.bool.isRequired
}

const LoginForm = reduxForm({
  form: 'submitValidation',
  fields: ['username', 'password']
})(SubmitValidationForm)

const Login = ({ handleClick }) => (
  <button onClick={() => handleClick('username', 'password')}>Login</button>
)

const Logout = ({ handleClick }) => (
  <button onClick={() => handleClick()}>Logout</button>
)


const LoginLogout = ({ isAuthenticated, handleLogin, handleLogout }) => (
  <div>
    { isAuthenticated ? <Logout handleClick={handleLogout} /> : <LoginForm /> }
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
