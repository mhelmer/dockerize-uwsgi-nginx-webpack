import React from 'react'
import { Link } from 'react-router-dom'
import Radium from 'radium'

import baseColors from 'constants/baseColors'

const styles = {
  a: {
    color: baseColors.orange0,
    textDecoration: 'none',
    fontWeight: 600,
    ':visited': {
      color: baseColors.orange0,
      textDecoration: 'none',
      fontWeight: 600,
    },
    ':hover': { color: baseColors.orange1 },
  },
}

const RadiumLink = Radium(Link)

const WrappedLink = ({ children, ...props }) => (
  <RadiumLink style={[styles.a]} {...props}>
    { children }
  </RadiumLink>
)

export default WrappedLink
