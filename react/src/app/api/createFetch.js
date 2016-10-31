import fetch from 'isomorphic-fetch'
import { checkStatus, parseJSON } from '../fetch'
import { getAuthToken } from '../storage'

function ApiError(message) {
  this.message = message
}

const defaultHeaders = {
  'Accept': 'application/json',
  'Content-Type': 'application/json',
}

const createFetch = (url, method) => payload => {
  const token = getAuthToken()
  const headers = token ? { ...defaultHeaders, 'Authorization': `JWT ${token}` }
    : defaultHeaders

  return fetch(
    url, {
      method,
      headers,
      body: payload ? JSON.stringify(payload) : undefined,
    }
  )
  .then(checkStatus)
  .then(parseJSON)
  .catch(e => { throw new ApiError(e.errors) })
}

export default createFetch
