import React from 'react'
import { connect } from 'react-redux'

import { getUser } from 'reducers'

export const User = ({ user }) => (
  <div>
    <h2>{ user ? user.username : 'Not Found'}</h2>
  </div>
)

const VisibleUser = connect(
  (state, { match: { params: { userId } } }) => ({ user: getUser(state, parseInt(userId, 10)) })
)(User)

export default VisibleUser
