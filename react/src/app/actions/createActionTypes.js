const createActionTypes = actionType => (
  [ 'REQUEST', 'SUCCESS', 'FAILURE' ].reduce((prev, subType) => ({
    ...prev,
    [subType]: `${actionType}_${subType}`,
  }), {})
)

export default createActionTypes
