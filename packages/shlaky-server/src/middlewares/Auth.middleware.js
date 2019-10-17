/* eslint-disable max-params */

import Middleware from './Middleware'

class AuthMiddleware extends Middleware {
  protect = async (req, res, next) => {
    const bearer = req.headers.authorization

    if (!bearer || !bearer.startsWith('Bearer ')) {
      return res.status(401).send({ message: 'authorization header is needed' })
    }

    const token = bearer.split('Bearer ')[1].trim()
    let payload
    try {
      payload = await this.utils.auth.verifyToken(token)
    } catch (error) {
      return res.status(401).send({ message: 'error verifying token', error })
    }

    const user = await this.services.resource.users.getOne(payload.id)
    if (!user) {
      return res
        .status(401)
        .send({ message: 'error finding user with that token' })
    }

    req.user = user
    next()
  }
}

export default AuthMiddleware
