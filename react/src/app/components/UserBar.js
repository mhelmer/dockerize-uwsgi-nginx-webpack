import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
import { logoutRequest } from '../actions/auth.js'
import { getUserId } from '../reducers'

const Logout = ({ handleClick }) => (
  <button className="logout-button" onClick={() => handleClick()}>Logout</button>
)

const SignedInPanel = ({ logoutRequest, userId }) => (
  <div>
    <div className="signed-in-user">
      Signed in as: { userId }
    </div>
    <Logout handleClick={logoutRequest} />
  </div>
)
SignedInPanel.propTypes = {
}

const mapStateToProps = state => ({ userId: getUserId(state) })
const mapDispatchToProps = { logoutRequest }

const UserBar = connect(mapStateToProps, mapDispatchToProps)(SignedInPanel)

export default UserBar
