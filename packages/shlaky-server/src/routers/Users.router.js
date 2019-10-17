import { Router as ExpressRouter } from 'express'

import Router from './Router'

class UsersRouter extends Router {
  setupInstance() {
    this.instance = ExpressRouter()
    this.instance.get('/', this.controllers.users.getMany)
    this.instance.get(
      '/me',
      this.middlewares.auth.protect,
      this.controllers.users.me
    )
    this.instance.get('/:id', this.controllers.users.getOne)
  }
}

export default UsersRouter
