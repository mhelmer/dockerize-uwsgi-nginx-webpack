import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
import { reduxForm } from 'redux-form'
import { login, logout } from '../actions/auth.js'

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
  error: PropTypes.string,
  fields: PropTypes.object.isRequired,
  resetForm: PropTypes.func.isRequired,
  submitting: PropTypes.bool.isRequired
}

const LoginForm = reduxForm({
  form: 'submitValidation',
  fields: ['username', 'password']
})(SubmitValidationForm)

const Logout = ({ handleClick }) => (
  <button onClick={() => handleClick()}>Logout</button>
)


const LoginLogout = ({ isAuthenticated, handleLogin, handleLogout }) => (
  <div>
    { isAuthenticated ? <Logout handleClick={handleLogout} /> : <LoginForm onSubmit={handleLogin}/> }
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
