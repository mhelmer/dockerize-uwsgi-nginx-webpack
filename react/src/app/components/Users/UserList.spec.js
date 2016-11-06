import React from 'react'
import { shallow } from 'enzyme'

import UserList, { UserListItem } from './UserList'

const firstUser = { id: 1, username: 'First user' }
const secondUser = { ...firstUser, id: 2, username: 'Second user' }

describe('UserList components', () => {

  describe('<UserList />', () => {
    const setup = props => {
      const enzymeWrapper = shallow(<UserList {...props} />)
      return {
        props,
        enzymeWrapper,
      }
    }
    it('renders two <UserListItem /> components when passed two users', () => {
      const { enzymeWrapper } = setup({ users: [ firstUser, secondUser ] })

      const UserListItems = enzymeWrapper.find(UserListItem)
      expect(UserListItems.length).toBe(2)
      expect(UserListItems.first().props().user.id).toBe(firstUser.id)
    })
    it('renders zero <UserListItem /> components when users prop is empty', () => {
      const { enzymeWrapper } = setup({ users: [] })

      expect(enzymeWrapper.find(UserListItem).length).toBe(0)
    })
    it('renders children when passed in', () => {
      const { enzymeWrapper } = setup({ users: [], children: <div className="unique" /> })

      expect(enzymeWrapper.contains(<div className="unique" />)).toBe(true)
    })
  })

  describe('<UserListItem />', () => {
    const setup = props => {
      const enzymeWrapper = shallow(<UserListItem {...props} />)
      return {
        props,
        enzymeWrapper,
      }
    }
    it('renders username', () => {
      const { enzymeWrapper } = setup({ user: firstUser })
      const UserLinks = enzymeWrapper.find('Link')
      expect(UserLinks.length).toBe(1)

      const UserLink = UserLinks.first()
      expect(UserLink.props().children).toBe(firstUser.username)
      expect(UserLink.props().to).toBe('/users/1')
    })
  })

})
