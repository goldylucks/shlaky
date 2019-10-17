import UsersController from './Users.controller'
import AuthController from './Auth.controller'

const createControllers = dependencies => {
  const users = new UsersController(dependencies)
  const auth = new AuthController(dependencies)

  return {
    users,
    auth,
  }
}

export default createControllers
