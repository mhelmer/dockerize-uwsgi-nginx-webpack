import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
import { reduxForm, Field } from 'redux-form'
import { compose } from 'redux'
import Radium from 'radium'

import { loginRequest } from 'actions/auth'
import { bindActionToPromise } from 'actions/utils'
import { getIsAuthenticated } from 'reducers'
import UserBar from 'components/UserBar'
import Button from 'components/Button'

const styles = {
  authPanel: {
    margin: '10px',
  },
}

const renderInput = ({ input, meta, type, label, placeholder }) => (
  <div>
    <label>
      { label }
      <input {...input} type={type} placeholder={placeholder} />
    </label>
    {meta.touched && meta.error && <span>{meta.error}</span>}
  </div>
)


const LoginForm = ({ error, reset, handleSubmit, submitting }) => (
  <form onSubmit={handleSubmit}>
    <Field component={renderInput} name="username" type="text" placeholder="Username" label="username" />
    <Field component={renderInput} name="password" type="password" placeholder="Password" label="password" />
    {error && <div>{error}</div>}
    <div>
      <Button kind="primary" type="submit" disabled={submitting}>
        Log In
      </Button>
      <Button type="button" disabled={submitting} onClick={reset}>
        Clear Values
      </Button>
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
  form: 'LoginForm',
})(LoginForm)

const AuthPanel = ({ isAuthenticated, handleLogin }) => (
  <div style={[ styles.authPanel ]}>
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

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  Radium
)(AuthPanel)
