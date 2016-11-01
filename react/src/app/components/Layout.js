import React from 'react'
import { Link } from 'react-router'
import { AuthPanel } from './Auth'
import css from '../styles/main.scss'

const Layout = ({ children }) => (
  <div className="root">
    <AuthPanel />
    <h1>Main Heading</h1>
    <ul>
      <li>
        <Link to={'/'} activeClassName="active">Home</Link>
      </li>
      <li>
        <Link to={'/users'} activeClassName="active">Users</Link>
      </li>
    </ul>
    <div className="detail">
      {children}
    </div>
  </div>
)

export default Layout
