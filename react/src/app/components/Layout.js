import React from 'react'
import Radium, { Style, StyleRoot } from 'radium'

import Auth from 'components/Auth'
import Link from 'components/Link'
import { H1 } from 'components/Headings'
import mediaQueries from 'styles/mediaQueries'
import baseColors from 'styles/baseColors'

const styles = {
  root: {
    width: '100%',
    margin: '0 auto',
    [mediaQueries.breakpointLarge]: {
      width: '960px',
    },
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
  <div style={[ styles.root ]}>
    <Auth />
    <H1>Main Heading</H1>
    <Nav />
    <div>
      {children}
    </div>
  </div>
)

const RadiumLayout = Radium(Layout)

const LayoutRoot = ({ children }) => (
  <StyleRoot>
    <Style rules={globalStyle} />
    <RadiumLayout>
      {children}
    </RadiumLayout>
  </StyleRoot>
)

export default LayoutRoot
