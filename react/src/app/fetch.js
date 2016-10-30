export const checkStatus = (response) => {
  if (response.status >= 200 && response.status < 300) {
    return response
  } else {
    var error = new Error(response.statusText)
    error.response = response
    return parseHTTPError(error)
  }
}

export const parseJSON = (response) => {
  const contentType = response.headers.get('content-type')
  if (contentType && contentType.indexOf('application/json') !== -1) {
    return response.json()
  }
}

export const parseHTTPError = (error) => {
  if (error.response.status !== 400) {
    error.errors = { _error: error.message }
    throw error
  }
  return parseJSON(error.response).then(json => {
    error.errors = { ...json, _error: json.non_field_errors }
    throw error
  })
}
