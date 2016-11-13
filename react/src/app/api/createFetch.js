import fetch from 'isomorphic-fetch'
import humps from 'humps'

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
      body: payload ? JSON.stringify(humps.decamelizeKeys(payload)) : undefined,
    }
  )
  .then(checkStatus)
  .then(parseJSON)
  .then(humps.camelizeKeys)
  .catch(e => { throw new ApiError(humps.camelizeKeys(e.errors)) })
}

export default createFetch
