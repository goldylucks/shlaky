import UsersModel from './Users.model'
import TasksModel from './Tasks.model'

const createModels = dependencies => {
  const users = new UsersModel(dependencies)
  const tasks = new TasksModel(dependencies)

  return {
    users,
    tasks,
  }
}

export default createModels
