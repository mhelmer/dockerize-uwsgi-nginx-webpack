import { LOGIN_REQUEST, LOGIN_SUCCESS, LOGIN_FAILURE, LOGOUT_SUCCESS } from '../actions/auth.js'

export function auth (state = {
    isFetching: false,
    isAuthenticated: false
  }, action) {
  switch (action.type) {
    case LOGIN_REQUEST:
      return {
        ...state,
        isFetching: true,
        isAuthenticated: false
      }
    case LOGIN_SUCCESS:
      return {
        ...state,
        token: action.token,
        payload: action.payload,
        isFetching: false,
        isAuthenticated: true
      }
    case LOGIN_FAILURE:
      return {
        ...state,
        token: null,
        payload: null,
        isFetching: false,
        isAuthenticated: false
      }
    case LOGOUT_SUCCESS:
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
