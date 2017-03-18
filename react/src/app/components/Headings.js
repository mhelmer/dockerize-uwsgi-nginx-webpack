import Radium from 'radium'
import { compose, defaultProps, mapProps, componentFromProp } from 'recompose'

import baseColors from 'styles/baseColors'

const styles = {
  heading: {
    backgroundColor: baseColors.bg2,
    padding: '.2em .5em',
    color: baseColors.green1,
    borderRadius: '.5em',
  },
  h1: {}, h2: {}, h3: {}, h4: {}, h5: {},
}

const mapOwnPropsToProps = ({ style = [], headingType, ...ownProps }) => ({
  style: [ styles.heading, styles[headingType], ...style ],
  ...ownProps,
})

const Heading = compose(
  Radium,
  mapProps(mapOwnPropsToProps)
)(componentFromProp('component'))

const createHeading = (headingType = 'h1') => defaultProps({ component: headingType, headingType })(Heading)

export const H1 = createHeading('h1')
export const H2 = createHeading('h2')
export const H3 = createHeading('h3')
export const H4 = createHeading('h4')
export const H5 = createHeading('h5')
