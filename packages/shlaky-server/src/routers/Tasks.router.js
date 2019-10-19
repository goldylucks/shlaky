import { Router as ExpressRouter } from 'express'

import Router from './Router'

class TasksRouter extends Router {
  setupInstance() {
    this.instance = ExpressRouter()
    this.instance.post('/', this.controllers.tasks.createOne)
    this.instance.get('/', this.controllers.tasks.getMany)
    this.instance.get('/:id', this.controllers.tasks.getOne)
    this.instance.put('/:id', this.controllers.tasks.updateOne)
    this.instance.delete('/:id', this.controllers.tasks.destroyOne)
  }
}

export default TasksRouter
