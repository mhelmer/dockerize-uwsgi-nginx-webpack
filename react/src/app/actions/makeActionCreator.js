const makeActionCreator = (type, ...argNames) => (...args) => {
  let action = { type }
  argNames.forEach((arg, index) => {
    action[arg] = args[index]
  })
  return action
}

export default makeActionCreator
