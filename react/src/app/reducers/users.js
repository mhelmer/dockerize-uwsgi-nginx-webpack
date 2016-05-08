const default_users = [
  {id: 1, username: 'magnus'},
  {id: 2, username: 'björn'},
  {id: 3, username: 'sofia'},
  {id: 4, username: 'lisbet'},
  {id: 5, username: 'janola'}
]

export function users(state={items: default_users}, action) {
  switch (action.type) {
    default:
      return state
  }
}
