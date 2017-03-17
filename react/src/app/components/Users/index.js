import React, { Component } from 'react'
import { connect } from 'react-redux'

import { getAllUsers, getIsFetchingUsers, getIsAuthenticated } from 'reducers'
import { fetchUsersRequest } from 'actions/user'
import UserList from './UserList'
import { H2 } from 'components/Headings'

class Users extends Component {
  componentDidMount() {
    this.props.isAuthenticated && this.props.fetchUsersRequest()
  }
  componentDidUpdate(prevProps) {
    !prevProps.isAuthenticated && this.props.isAuthenticated && this.props.fetchUsersRequest()
  }
  render() {
    const { isAuthenticated, isFetching, users, children } = this.props
    return (
      <div>
        <H2>Users</H2>
        { !isAuthenticated ? <span>Log in to see users</span>
          : users.length === 0 && isFetching ? <span>Loading...</span>
          : <UserList users={users} children={children} />
        }
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
