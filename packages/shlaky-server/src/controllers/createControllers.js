import UsersController from './Users.controller'
import AuthController from './Auth.controller'
import TasksController from './Tasks.controller'

const createControllers = dependencies => {
  const users = new UsersController(dependencies)
  const auth = new AuthController(dependencies)
  const tasks = new TasksController(dependencies)

  return {
    users,
    auth,
    tasks,
  }
}

export default createControllers
