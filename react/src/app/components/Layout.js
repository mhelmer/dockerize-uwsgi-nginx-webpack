import React from 'react'
import { NavLink } from 'react-router-dom'

import Auth from 'components/Auth'
import 'styles/main.scss'

const Layout = ({ children }) => (
  <div className="root">
    <Auth />
    <h1>Main Heading</h1>
    <ul>
      <li>
        <NavLink to={'/'} activeClassName="active">Home</NavLink>
      </li>
      <li>
        <NavLink to={'/users'} activeClassName="active">Users</NavLink>
      </li>
    </ul>
    <div className="detail">
      {children}
    </div>
  </div>
)

export default Layout
