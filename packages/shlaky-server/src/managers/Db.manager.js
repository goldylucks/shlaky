import mongoose from 'mongoose'

import Manager from './Manager'

class DbManager extends Manager {
  keys = ['users', 'tasks']

  constructor(...args) {
    super(...args)
    this.setup()
  }

  setup() {
    this.keys.forEach(this.setupResource)
  }

  setupResource = key => {
    this[key] = {
      getOne: id => this.getOne(id, { model: this.models[key].getInstance() }),
      getMany: () => this.getMany({ model: this.models[key].getInstance() }),
      createOne: data =>
        this.createOne({ model: this.models[key].getInstance(), data }),
      updateOne: (id, data) =>
        this.updateOne(id, { model: this.models[key].getInstance(), data }),
      destroyOne: id =>
        this.destroyOne(id, { model: this.models[key].getInstance() }),
    }
  }

  connect = (url = this.config.dbUrl, options = {}) => {
    return mongoose.connect(url, { ...options, useNewUrlParser: true })
  }

  getOne = async (id, { model }) => {
    try {
      const item = await model.findById(id)
      return { item }
    } catch (error) {
      global.console.error(
        `[db.getOne] ${model.collection.name} with id ${id}`,
        error
      )
      return { error, item: {} }
    }
  }

  getMany = async ({ model }) => {
    try {
      const collection = await model.find()
      return { collection }
    } catch (error) {
      global.console.error(`[db.getMany] ${model.collection.name}`)
      return { error, collection: [] }
    }
  }

  createOne = async ({ model, data }) => {
    try {
      const item = await model.create(data)
      return { item }
    } catch (error) {
      global.console.error(
        `[db.createOne] error ${model.collection.name} with data`,
        data
      )
      global.console.error(error)
      return { error, item: {} }
    }
  }

  updateOne = async (id, { model, data }) => {
    try {
      const item = await model.findByIdAndUpdate(id, data, { new: true })
      if (!item) {
        global.console.error(
          `[db.updateOne] ${model.collection.name} with id ${id} not found`
        )
        return { error: new Error('not found'), item: {} }
      }
      return { item }
    } catch (error) {
      global.console.error(
        `[db.updateOne] ${model.collection.name} with id ${id}`,
        error
      )
      return { error, item: {} }
    }
  }

  destroyOne = async (id, { model }) => {
    try {
      const item = await model.findByIdAndRemove(id)
      if (!item) {
        global.console.error(
          `[db.destroyOne] ${model.collection.name} with id ${id} not found`
        )
        return { error: new Error('not found'), item: {} }
      }
      return { item }
    } catch (error) {
      global.console.error(
        `[db.updateOne] ${model.collection.name} with id ${id}`,
        error
      )
      return { error, item: {} }
    }
  }
}

export default DbManager
