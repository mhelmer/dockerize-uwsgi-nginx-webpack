import fetch from 'isomorphic-fetch'
import { checkStatus, parseJSON } from '../fetch.js'

function ApiError(message) {
  this.message = message
}

export const authenticate = (username, password) => (
  fetch('/api-token-auth/', {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ username, password })
  })
  .then(checkStatus)
  .then(parseJSON)
  .catch(e => parseJSON(e.response)
         .then(json => { throw new ApiError({ ...json, _error: json.non_field_errors }) })
  )
)

export const tokenRefresh = (payload) => (
  fetch('/api-token-refresh/', {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(payload)
  })
  .then(checkStatus)
  .then(parseJSON)
  .catch(e => parseJSON(e.response)
         .then(json => { throw new ApiError({ ...json, _error: json.non_field_errors }) })
  )
)
