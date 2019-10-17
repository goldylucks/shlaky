import jwt from 'jsonwebtoken'

import Util from './Util'

class AuthUtil extends Util {
  newToken = user =>
    jwt.sign({ id: user.id }, this.config.jwtSecret, {
      expiresIn: this.config.jwtExpiresIn,
    })

  verifyToken = token =>
    new Promise((resolve, reject) => {
      jwt.verify(token, this.config.jwtSecret, (error, payload) => {
        if (error) {
          return reject(error)
        }
        resolve(payload)
      })
    })
}

export default AuthUtil
