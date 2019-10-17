import { Router } from 'express'

import UsersRouter from './Users.router'
import AuthRouter from './Auth.router'

const router = Router()

const createRouters = dependencies => {
  const users = new UsersRouter(dependencies)
  const auth = new AuthRouter(dependencies)

  router.use('/users', users)
  router.use('/auth', auth)

  return router
}

export default createRouters
