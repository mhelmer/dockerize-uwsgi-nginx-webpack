import * as actionTypes from '../constants/actionTypes'

const users = ( state = { isFetching: false, items: [] }, action) => {
  switch (action.type) {
    case actionTypes.FETCH_USERS.REQUEST:
      return { ...state, isFetching: true }
    case actionTypes.FETCH_USERS.SUCCESS:
      return { ...state, isFetching: false, items: action.payload }
    case actionTypes.FETCH_USERS.FAILURE:
      return { ...state, isFetching: false }
    default:
      return state
  }
}

export default users

export const getAll = state => state.items
export const getIsFetching = state => state.isFetching
