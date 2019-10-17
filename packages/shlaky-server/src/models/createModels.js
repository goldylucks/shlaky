import UsersModel from './Users.model'

const createModels = dependencies => {
  const users = new UsersModel(dependencies)

  return {
    users,
  }
}

export default createModels
