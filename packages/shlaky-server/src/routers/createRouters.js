import { Router } from 'express'

import UsersRouter from './Users.router'
import AuthRouter from './Auth.router'
import TasksRouter from './Tasks.router'

const router = Router()

const createRouters = dependencies => {
  const users = new UsersRouter(dependencies)
  const auth = new AuthRouter(dependencies)
  const tasks = new TasksRouter(dependencies)

  router.use('/users', users.getInstance())
  router.use('/auth', auth.getInstance())
  router.use('/tasks', tasks.getInstance())

  return router
}

export default createRouters
