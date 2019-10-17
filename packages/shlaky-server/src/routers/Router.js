import Base from '../Base'

class Router extends Base {
  instance

  getInstance() {
    if (!this.instance) {
      this.setupInstance()
    }
    return this.instance
  }
}

export default Router
