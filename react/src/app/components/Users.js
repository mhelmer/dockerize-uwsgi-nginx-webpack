import React, { Component } from 'react'
import { Link } from 'react-router'
import { connect } from 'react-redux'
import { getAllUsers, getIsFetchingUsers, getIsAuthenticated } from '../reducers'
import { fetchUsersRequest, isAuthenticated } from '../actions/user'

const UserList = ({ users, children }) => (
  <ul>
    { users.map(user => (
      <li key={user.id}>
        <Link to={`/users/${user.id}`} activeClassName="active">{user.username}</Link>
      </li>
    )) }
  </ul>
)

class Users extends Component {
  componentDidMount () {
    this.props.isAuthenticated && this.props.fetchUsersRequest()
  }
  componentDidUpdate(prevProps) {
    !prevProps.isAuthenticated && this.props.isAuthenticated && this.props.fetchUsersRequest()
  }
  render () {
    const { isAuthenticated, isFetching, users, children } = this.props
    return (
      <div>
        <h2>Users</h2>
        { !isAuthenticated ? <span>Log in to see users</span>
          : users.length === 0 && isFetching ? <span>Loading...</span>
          : <UserList users={users} />
        }
        {children}
      </div>
    )
  }
}

const mapStateToProps = state => ({
  isFetching: getIsFetchingUsers(state),
  isAuthenticated: getIsAuthenticated(state),
  users: getAllUsers(state),
})
const mapDispatchToProps = { fetchUsersRequest }

Users = connect(mapStateToProps, mapDispatchToProps)(Users)

export default Users
