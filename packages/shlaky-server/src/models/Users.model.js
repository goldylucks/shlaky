import mongoose from 'mongoose'
import bcrypt from 'bcrypt'

import Model from './Model'

class UsersModel extends Model {
  instance

  schema

  constructor(...args) {
    super(...args)
    this.setupInstance()
  }

  setupInstance() {
    this.schema = this.getSchema()
    this.schema.pre('save', this.preSave)
    this.schema.methods.checkPassword = this.checkPassword
    this.schema.methods.formatToResponse = this.registerFormatToResponse({
      utils: this.utils,
    })
    this.instance = mongoose.model('users', this.schema)
  }

  getSchema() {
    return new mongoose.Schema(
      {
        email: {
          type: String,
          required: true,
          unique: true,
          trim: true,
        },

        password: {
          type: String,
          required: true,
        },
      },
      { timestamps: true }
    )
  }

  preSave(next) {
    if (!this.isModified('password')) {
      return next()
    }

    bcrypt.hash(this.password, 8, (err, hash) => {
      if (err) {
        return next(err)
      }

      this.password = hash
      next()
    })
  }

  checkPassword(password) {
    const passwordHash = this.password
    return new Promise((resolve, reject) => {
      bcrypt.compare(password, passwordHash, (err, same) => {
        if (err) {
          return reject(err)
        }

        resolve(same)
      })
    })
  }

  registerFormatToResponse = ({ utils }) =>
    function formatToResponse() {
      return {
        ...this.toJSON(),
        password: undefined,
        token: utils.auth.newToken(this),
      }
    }
}

export default UsersModel
