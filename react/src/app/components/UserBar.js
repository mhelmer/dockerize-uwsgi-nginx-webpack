import React, { PropTypes } from 'react'
import Radium from 'radium'
import { compose } from 'redux'
import { connect } from 'react-redux'

import { logoutRequest } from 'actions/auth.js'
import { getUserId } from 'reducers'
import baseColors from 'styles/baseColors'

const styles = {
  baseButton: {
    backgroundColor: baseColors.bg1,
    color: baseColors.red0,
    border: `1px solid ${baseColors.red0}`,
  },
  logoutButton: {
    float: 'right',
  },
  signedInUser: {
    display: 'inline-block',
  },
}

const Logout = Radium(({ handleClick }) => (
  <button
    style={[ styles.baseButton, styles.logoutButton ]}
    onClick={() => handleClick()}
  >
    Logout
  </button>
))

const SignedInPanel = ({ logoutRequest, userId }) => (
  <div>
    <div style={[ styles.signedInUser ]}>
      Signed in as: { userId }
    </div>
    <Logout handleClick={logoutRequest} />
  </div>
)
SignedInPanel.propTypes = {
  logoutRequest: PropTypes.func.isRequired,
  userId: PropTypes.number.isRequired,
}

const mapStateToProps = state => ({ userId: getUserId(state) })
const mapDispatchToProps = { logoutRequest }

const UserBar = compose(
  connect(mapStateToProps, mapDispatchToProps),
  Radium
)(SignedInPanel)

export default UserBar
