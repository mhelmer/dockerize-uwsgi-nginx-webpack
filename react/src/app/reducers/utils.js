export const updateObject = (oldObject, newValues) => ({
  ...oldObject,
  ...newValues,
})

export const createReducer = (intialState, handlers) => (state = intialState, action) => (
  handlers.hasOwnProperty(action.type) ? handlers[action.type](state, action)
    : state
)

export const createIsFetching = ({ FAILURE, REQUEST, SUCCESS }) => createReducer(false, {
  [FAILURE]: () => false,
  [REQUEST]: () => true,
  [SUCCESS]: () => false,
})
