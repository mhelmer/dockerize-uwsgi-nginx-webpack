export const getAuthToken = () => JSON.parse(localStorage.getItem('token'))
export const setAuthToken = (token) => { localStorage.setItem('token', JSON.stringify(token)) }
export const removeAuthToken = () => { localStorage.removeItem('token') }
