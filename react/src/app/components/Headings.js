import { DOM } from 'react'
import Radium from 'radium'
import { compose, mapProps } from 'recompose'

import baseColors from 'styles/baseColors'

const { h1, h2, h3, h4, h5 } = DOM

const styles = {
  heading: {
    backgroundColor: baseColors.bg2,
    padding: '.2em .5em',
    color: baseColors.green1,
    borderRadius: '.5em',
  },
  h1: {}, h2: {}, h3: {}, h4: {}, h5: {},
}

const mapOwnPropsToProps = headingType => ({ style = [], ...ownProps }) => ({
  style: [ styles.heading, styles[headingType], ...style ],
  ...ownProps,
})

const createEnhance = headingType => compose(
  Radium,
  mapProps(mapOwnPropsToProps(headingType))
)

export const H1 = createEnhance('h1')(h1)
export const H2 = createEnhance('h2')(h2)
export const H3 = createEnhance('h3')(h3)
export const H4 = createEnhance('h4')(h4)
export const H5 = createEnhance('h5')(h5)
