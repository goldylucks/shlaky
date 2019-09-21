import { computed } from 'mobx'

import Manager from './Manager'

class RoutingManager extends Manager {
  get = {}

  is = {}

  to = {}

  constructor(dependencies) {
    super(dependencies)
    this.setup()
  }

  setup() {
    this.config.routes.forEach(this.setupRoute)
  }

  back() {
    this.utils.history.goBack()
  }

  setupRoute = route => {
    if (route === '/') {
      this.setupHomeRoute()
      return
    }
    const routeName = route.substr(1)
    this.get[routeName] = () => route
    this.is[routeName] = (pathname = this.pathname) => pathname === route
    this.to[routeName] = () => this.utils.history.push(this.get[routeName]())
  }

  setupHomeRoute() {
    this.get.home = () => '/'
    this.is.home = (pathname = this.pathname) => pathname === '/'
    this.to.home = () => this.utils.history.push(this.get.home())
  }

  @computed
  get pathname() {
    return this.utils.history.location.pathname
  }
}

export default RoutingManager
