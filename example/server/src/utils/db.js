import mongoose from 'mongoose'
import options from '../config'

class Db {
  constructor({ adapter }) {
    this.adapter = adapter
  }

  getOne (...args) {
    this.adapter.getOne(...args)
  }
}

class DbMongooseAdapter {
  connect() {
  return mongoose.connect(
    url,
    { ...opts, useCreateIndex: true, useNewUrlParser: true }
  )
  }
}

export const connect = (url = options.dbUrl, opts = {}) => {
  return mongoose.connect(
    url,
    { ...opts, useCreateIndex: true, useNewUrlParser: true }
  )
}

export const getOne = async ({ model, query }) => {
  return 
  try {
    const item = await model.findOne(query).lean().exec()
    return { item  }
  } catch (error) {
    return { error }
  }
}

export const getOne = async ({ model, query }) => tryCatch(async () => ({
  item: await model.findOne(query).lean().exec()
}))




function tryCatch (func) {
  try {
    return func()
  } catch (error) {
    return { error }
  }
}
