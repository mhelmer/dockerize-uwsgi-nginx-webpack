import React from 'react'
import { AuthPanel } from './auth.jsx'
import { Link } from 'react-router'
import css from '../styles/main.scss'

const Layout = ({ children }) => (
  <div>
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
