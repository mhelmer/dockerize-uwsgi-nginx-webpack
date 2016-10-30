import React from 'react'
import { Link } from 'react-router'
import { connect } from 'react-redux'
import { getAllUsers } from '../reducers'

const UserList = ({users, children}) => (
  <div>
    <h2>Users</h2>
    <ul>
      { users.map(user => (
        <li key={user.id}>
          <Link to={`/users/${user.id}`} activeClassName="active">{user.username}</Link>
        </li>
      )) }
    </ul>
    {children}
  </div>
)

const Users = connect(state => ({ users: getAllUsers(state) }))(UserList)

export default Users
