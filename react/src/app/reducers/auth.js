import * as actionTypes from '../constants/actionTypes'

export function auth (state = {
    isFetching: false,
    isAuthenticated: false
  }, action) {
  switch (action.type) {
    case actionTypes.LOGIN_REQUEST:
      return {
        ...state,
        isFetching: true,
        isAuthenticated: false
      }
    case actionTypes.LOGIN_SUCCESS:
      return {
        ...state,
        token: action.token,
        payload: action.payload,
        isFetching: false,
        isAuthenticated: true
      }
    case actionTypes.LOGIN_FAILURE:
      return {
        ...state,
        token: null,
        payload: null,
        isFetching: false,
        isAuthenticated: false
      }
    case actionTypes.LOGOUT_SUCCESS:
      return {
        ...state,
        token: null,
        payload: null,
        isFetching: false,
        isAuthenticated: false
      }
    default:
      return state
  }
}
