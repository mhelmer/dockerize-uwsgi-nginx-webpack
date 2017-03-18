import React, { PropTypes } from 'react'
import { Link } from 'react-router-dom'
import Radium from 'radium'

import baseColors from 'styles/baseColors'

const styles = {
  a: {
    color: baseColors.orange1,
    textDecoration: 'none',
    fontWeight: 600,
    ':hover': { color: baseColors.orange0 },
  },
}

const RadiumLink = Radium(Link)

const WrappedLink = ({ children, ...props }) => (
  <RadiumLink style={[ styles.a ]} {...props}>
    { children }
  </RadiumLink>
)
WrappedLink.propTypes = {
  children: PropTypes.node.isRequired,
}

export default WrappedLink
