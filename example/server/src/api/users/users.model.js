import mongoose from 'mongoose'
import bcrypt from 'bcrypt'

import { newToken } from '../../utils/auth'

const usersSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true
    },

    password: {
      type: String,
      required: true
    }
  },
  { timestamps: true }
)

usersSchema.pre('save', function(next) {
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
})

usersSchema.methods.checkPassword = function(password) {
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

usersSchema.methods.formatToResponse = function() {
  return {
    ...this.toObject(),
    token: newToken(this),
  }
}
  
export const Users = mongoose.model('users', usersSchema)
