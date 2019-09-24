/* eslint import/no-extraneous-dependencies: 0 */

import { computed } from 'mobx'

import Manager from './Manager'

class RoutingManager extends Manager {
  get = {}

  is = {}

  to = {}

  constructor({ config, dependencies, overrides }) {
    super({ config, dependencies, overrides })
    this.setup()
  }

  setup() {
    this.setupHomeRoute()
    this.setupResourcesRoutes()
    this.setupStatesRoutes()
    this.config.routes.forEach(this.setupRoute)
    if (this.supportsCurrentUser) {
      this.setupCurrentUser()
    }
  }

  back() {
    this.utils.history.goBack()
  }

  setupResourcesRoutes() {
    this.config.resources.map(resource => resource.key).forEach(this.setupRoute)
  }

  setupStatesRoutes() {
    this.config.states.map(state => state.key).forEach(this.setupRoute)
  }

  setupRoute = route => {
    this.get[route] = () => `/${route}`
    this.is[route] = (pathname = this.pathname) => pathname === `/${route}`
    this.to[route] = () => this.utils.history.push(this.get[route]())
  }

  setupHomeRoute() {
    this.get.home = () => '/'
    this.is.home = (pathname = this.pathname) => pathname === '/'
    this.to.home = () => this.utils.history.push(this.get.home())
  }

  setupCurrentUser() {
    this.setupRoute('profile')
    this.setupRoute('login')
    this.setupRoute('signup')
    this.setupRoute('auth')
  }

  @computed
  get pathname() {
    return this.utils.history.location.pathname
  }
}

export default RoutingManager
