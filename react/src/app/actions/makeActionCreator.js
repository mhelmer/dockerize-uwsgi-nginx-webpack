const makeActionCreator = (type, ...argNames) => (...args) => {
  let action = { type }
  argNames.forEach((arg, index) => {
    action[arg[index]] = args[index]
  })
  return action
}

export default makeActionCreator
