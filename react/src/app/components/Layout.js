import React from 'react'
import Radium, { Style, StyleRoot } from 'radium'

import Auth from 'components/Auth'
import baseColors from 'constants/baseColors'
import Link from 'components/Link'
import { H1 } from 'components/Headings'

const styles = {
  root: {
    width: '960px',
    margin: '0 auto',
  },
}
const globalStyle = {
  'body': {
    backgroundColor: baseColors.bg,
    color: baseColors.fg,
    fontFamily: 'sans-serif',
  },
}


const routes = [
  { to: '/', name: 'Home' },
  { to: '/users', name: 'Users' },
]
const Nav = () => (
  <ul>
    { routes.map(({ to, name }) => (
      <li key={to}>
        <Link to={to}>{ name }</Link>
      </li>
    )) }
  </ul>
)

const Layout = ({ children }) => (
  <StyleRoot>
    <Style rules={globalStyle} />
    <div style={[ styles.root ]}>
      <Auth />
      <H1>Main Heading</H1>
      <Nav />
      <div>
        {children}
      </div>
    </div>
  </StyleRoot>
)

export default Radium(Layout)
