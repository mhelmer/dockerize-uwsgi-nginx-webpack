import fetch from 'isomorphic-fetch'
import { checkStatus, parseJSON } from '../fetch'

function ApiError(message) {
  this.message = message
}

const createFetch = (url, method) => payload => {
  const headers = {
    'Accept': 'application/json',
    'Content-Type': 'application/json'
  }

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
