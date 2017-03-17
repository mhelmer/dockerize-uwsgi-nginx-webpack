import React from 'react'
import { connect } from 'react-redux'

import { getUser } from 'reducers'
import { H2 } from 'components/Headings'

export const User = ({ user }) => (
  <div>
    <H2>{user ? user.username : 'Not Found'}</H2>
  </div>
)

const VisibleUser = connect(
  (state, { match: { params: { userId } } }) => ({ user: getUser(state, parseInt(userId)) })
)(User)

export default VisibleUser
