import mongoose from 'mongoose'

import Model from './Model'

class TasksModel extends Model {
  instance

  schema

  constructor(...args) {
    super(...args)
    this.setupInstance()
  }

  setupInstance() {
    this.schema = this.getSchema()
    this.instance = mongoose.model('tasks', this.schema)
  }

  getSchema() {
    return new mongoose.Schema(
      {
        title: {
          type: String,
          required: true,
          unique: true,
          trim: true,
        },

        isDone: {
          type: Boolean,
          required: true,
          default: false,
        },
      },
      { timestamps: true }
    )
  }
}

export default TasksModel
