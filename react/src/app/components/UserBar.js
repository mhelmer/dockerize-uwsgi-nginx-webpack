import React, { PropTypes } from 'react'
import Radium from 'radium'
import { compose } from 'redux'
import { connect } from 'react-redux'

import { logoutRequest } from 'actions/auth.js'
import { getUserId } from 'reducers'
import Button from 'components/Button'

const styles = {
  logoutButton: {
    float: 'right',
  },
  signedInUser: {
    display: 'inline-block',
  },
}

const Logout = ({ handleClick }) => (
  <Button style={[ styles.logoutButton ]} onClick={() => handleClick()}>
    Logout
  </Button>
)
Logout.propTypes = {
  handleClick: PropTypes.func.isRequired,
}

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
