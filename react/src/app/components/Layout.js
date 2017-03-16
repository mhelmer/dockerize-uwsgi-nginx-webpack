import React from 'react'
import Radium, { Style, StyleRoot } from 'radium'

import Auth from 'components/Auth'
import baseColors from 'constants/baseColors'
import Link from 'components/Link'

const styles = {
  root: {
    width: '960px',
    margin: '0 auto',
  },
  heading: {
    backgroundColor: baseColors.bg2,
    padding: '.2em .5em',
    borderRadius: '.5em',
  },
}
const globalStyle = {
  'body': {
    backgroundColor: baseColors.bg,
    color: baseColors.fg,
    fontFamily: 'sans-serif',
  },
}

const Layout = ({ children }) => (
  <StyleRoot>
    <Style rules={globalStyle} />
    <div style={[ styles.root ]}>
      <Auth />
      <h1 style={[ styles.heading ]}>Main Heading</h1>
      <ul>
        <li>
          <Link to={'/'}>Home</Link>
        </li>
        <li>
          <Link to={'/users'}>Users</Link>
        </li>
      </ul>
      <div>
        {children}
      </div>
    </div>
  </StyleRoot>
)

export default Radium(Layout)
