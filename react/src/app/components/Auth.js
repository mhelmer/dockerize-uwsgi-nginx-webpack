import PropTypes from 'prop-types'
import React from 'react'
import { connect } from 'react-redux'
import { reduxForm, Field } from 'redux-form'

import { loginRequest } from 'actions/auth'
import { bindActionToPromise } from 'actions/utils'
import { getIsAuthenticated } from 'reducers'
import UserBar from 'components/UserBar'

const renderInput = ({ input, meta, type, label, placeholder }) => (
  <div>
    <label>
      { label }
      <input {...input} type={type} placeholder={placeholder} />
    </label>
    {meta.touched && meta.error && <span className="error">{meta.error}</span>}
  </div>
)


const LoginForm = ({ error, reset, handleSubmit, submitting }) => (
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

LoginForm.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  error: PropTypes.array,
  reset: PropTypes.func.isRequired,
  submitting: PropTypes.bool.isRequired,
}

const LoginReduxForm = reduxForm({
  form: 'submitValidation',
})(LoginForm)

const AuthPanel = ({ isAuthenticated, handleLogin }) => (
  <div className="auth-panel">
    { isAuthenticated ? <UserBar />
      : <LoginReduxForm onSubmit={handleLogin}/> }
  </div>
)

const mapStateToProps = state => ({
  isAuthenticated: getIsAuthenticated(state),
})

const mapDispatchToProps = dispatch => ({
  handleLogin: bindActionToPromise(dispatch, loginRequest),
})

export default connect(mapStateToProps, mapDispatchToProps)(AuthPanel)
