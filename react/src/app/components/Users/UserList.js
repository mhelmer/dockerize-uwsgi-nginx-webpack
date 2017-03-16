import React, { PropTypes } from 'react'
import Link from 'components/Link'

export const UserListItem = ({ user }) => (
  <li>
    <Link to={`/users/${user.id}`}>{user.username}</Link>
  </li>
)
UserListItem.propTypes = {
  user: PropTypes.shape({
    id: PropTypes.number.isRequired,
    username: PropTypes.string.isRequired,
  }).isRequired,
}

const UserList = ({ users, children }) => (
  <div>
    <ul>
      { users.map(user => <UserListItem key={user.id} user={user} />) }
    </ul>
    { children }
  </div>
)
UserList.propTypes = {
  users: PropTypes.array.isRequired,
  children: PropTypes.node,
}

export default UserList
