import React from 'react'
import { shallow } from 'enzyme'

import { User } from './User'
import { H2 } from '../Headings'

const firstUser = { id: 1, username: 'First user' }

describe('<User />', () => {
  const setup = props => {
    const enzymeWrapper = shallow(<User {...props} />)
    return {
      props,
      enzymeWrapper,
    }
  }
  it('renders one <h2 />', () => {
    const { enzymeWrapper } = setup({ user: firstUser })

    const Headings = enzymeWrapper.find(H2)

    expect(Headings.length).toBe(1)
    expect(Headings.first().props().children).toBe('First user')
  })
})
