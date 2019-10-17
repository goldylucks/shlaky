import { Router as ExpressRouter } from 'express'

import Router from './Router'

class AuthRouter extends Router {
  setupInstance() {
    this.instance = ExpressRouter()
    this.instance.post('/login', this.controllers.auth.login)
    this.instance.post('/signup', this.controllers.auth.signup)
  }
}

export default AuthRouter
