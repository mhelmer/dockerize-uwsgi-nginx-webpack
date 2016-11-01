import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
import { reduxForm } from 'redux-form'
import { loginRequest } from '../actions/auth'
import { getIsAuthenticated } from '../reducers'
import UserBar from './UserBar'

/* eslint-disable */
export const domOnlyProps = ({
  initialValue,
  autofill,
  onUpdate,
  valid,
  invalid,
  dirty,
  pristine,
  active,
  touched,
  visited,
  autofilled,
  error,
  ...domProps }) => domProps
/* eslint-enable */

const SubmitValidationForm = ({ fields: {username, password}, error, resetForm, handleSubmit, submitting }) => (
  <form onSubmit={handleSubmit}>
    <div>
      <label htmlFor="username">Username</label>
      <div>
        <input name={username} type="text" placeholder="Username" {...domOnlyProps(username)}/>
      </div>
      {username.touched && username.error && <div>{username.error}</div>}
    </div>
    <div>
      <label htmlFor="password">Password</label>
      <div>
        <input name="password" type="password" placeholder="Password" {...domOnlyProps(password)}/>
      </div>
      {password.touched && password.error && <div>{password.error}</div>}
    </div>
    {error && <div>{error}</div>}
    <div>
      <button type="submit" disabled={submitting}>
        Log In
      </button>
      <button type="button" disabled={submitting} onClick={resetForm}>
        Clear Values
      </button>
    </div>
  </form>
)

SubmitValidationForm.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  error: PropTypes.array,
  fields: PropTypes.object.isRequired,
  resetForm: PropTypes.func.isRequired,
  submitting: PropTypes.bool.isRequired
}

const LoginForm = reduxForm({
  form: 'submitValidation',
  fields: ['username', 'password']
})(SubmitValidationForm)

const LoginLogout = ({ isAuthenticated, handleLogin, handleLogout }) => (
  <div className="auth-panel">
    { isAuthenticated ? <UserBar /> : <LoginForm onSubmit={handleLogin}/> }
  </div>
)

const mapStateToProps = state => ({
  isAuthenticated: getIsAuthenticated(state),
})

const mapDispatchToProps = dispatch => ({
  handleLogin: values => new Promise(
    (resolve, reject) => dispatch(loginRequest(values, resolve, reject))
  ),
})

export const AuthPanel = connect(mapStateToProps, mapDispatchToProps)(LoginLogout)
