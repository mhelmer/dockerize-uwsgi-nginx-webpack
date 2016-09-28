const makeActionCreator = (type, ...argNames) => (...args) => {
  let action = { type }
  console.log(args)
  argNames.forEach((arg, index) => {
    action[arg] = args[index]
  })
  return action
}

export default makeActionCreator
