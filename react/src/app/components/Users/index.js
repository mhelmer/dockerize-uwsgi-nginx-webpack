import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Route } from 'react-router-dom'

import { getAllUsers, getIsFetchingUsers, getIsAuthenticated } from 'reducers'
import { fetchUsersRequest } from 'actions/user'
import User from './User'
import UserList from './UserList'

class Users extends Component {
  componentDidMount() {
    this.props.isAuthenticated && this.props.fetchUsersRequest()
  }
  componentDidUpdate(prevProps) {
    !prevProps.isAuthenticated && this.props.isAuthenticated && this.props.fetchUsersRequest()
  }
  render() {
    const { match, isAuthenticated, isFetching, users } = this.props
    return (
      <div>
        <h2>Users</h2>
        { !isAuthenticated ? <span>Log in to see users</span>
          : users.length === 0 && isFetching ? <span>Loading...</span>
          : (
            <UserList users={users}>
              <Route path={`${match.url}/:userId`} component={User} />
            </UserList>
        ) }
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
