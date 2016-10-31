import createFetch from './createFetch'

export const authenticate = createFetch('/api-token-auth/', 'POST')
export const tokenRefresh = createFetch('/api-token-refresh/', 'POST')

export const fetchUsers = createFetch('/api/users/', 'GET')
