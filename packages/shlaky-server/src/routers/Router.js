import { Router as ExpressRouter } from 'express'

import Base from '../Base'

class Router extends Base {
  instance

  getInstance() {
    if (!this.instance) {
      this.setupInstance()
    }
    return this.instance
  }

  setupInstance() {
    const key = this._key
    this.instance = ExpressRouter()
    this.instance.post('/', this.controllers[key].createOne)
    this.instance.get('/', this.controllers[key].getMany)
    this.instance.get('/:id', this.controllers[key].getOne)
    this.instance.put('/:id', this.controllers[key].updateOne)
    this.instance.delete('/:id', this.controllers[key].destroyOne)
  }
}

export default Router
