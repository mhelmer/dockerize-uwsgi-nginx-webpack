const createActionTypes = actionType => (
  [ 'REQUEST', 'SUCCESS', 'FAILURE', 'INVALIDATE' ].reduce((prev, subType) => ({
    ...prev,
    [subType]: `${actionType}_${subType}`,
  }), {})
)

export default createActionTypes
