import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
import { reduxForm, Field } from 'redux-form'
import { loginRequest } from '../actions/auth'
import { bindActionToPromise } from '../actions/utils'
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

const renderInput = ({ input, meta, type, label, placeholder }) => (
  <div>
    <label>
      { label }
      <input {...input} type={type} placeholder={placeholder} />
    </label>
    {meta.touched && meta.error && <span className="error">{meta.error}</span>}
  </div>
)


const SubmitValidationForm = ({ error, reset, handleSubmit, submitting }) => (
  <form onSubmit={handleSubmit}>
    <Field component={renderInput} name="username" type="text" placeholder="Username" label="username" />
    <Field component={renderInput} name="password" type="password" placeholder="Password" label="password" />
    {error && <div>{error}</div>}
    <div>
      <button type="submit" disabled={submitting}>
        Log In
      </button>
      <button type="button" disabled={submitting} onClick={reset}>
        Clear Values
      </button>
    </div>
  </form>
)

SubmitValidationForm.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  error: PropTypes.array,
  reset: PropTypes.func.isRequired,
  submitting: PropTypes.bool.isRequired,
}

const LoginForm = reduxForm({
  form: 'submitValidation',
})(SubmitValidationForm)

const LoginLogout = ({ isAuthenticated, handleLogin }) => (
  <div className="auth-panel">
    { isAuthenticated ? <UserBar /> : <LoginForm onSubmit={handleLogin}/> }
  </div>
)

const mapStateToProps = state => ({
  isAuthenticated: getIsAuthenticated(state),
})

const mapDispatchToProps = dispatch => ({
  handleLogin: bindActionToPromise(dispatch, loginRequest),
})

export const AuthPanel = connect(mapStateToProps, mapDispatchToProps)(LoginLogout)
