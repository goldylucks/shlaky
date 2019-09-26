import { Users } from '../users/users.model'
import { newToken } from '../../utils/auth'

const invalid = { message: 'email or password invalid' }

const login = async (req, res) => {
  const { email, password } = req.body
  if (!email || !password) {
    return res.status(400).send({ message: 'email and password needed' })
  }

  try {
    const userDoc = await Users.findOne({ email })
      .select('email password')
      .exec()

    if (!userDoc) {
      return res.status(401).send(invalid)
    }

    const passwordMatches = await userDoc.checkPassword(password)

    if (!passwordMatches) {
      return res.status(401).send(invalid)
    }

    return res
      .status(201)
      .send({ user: userDoc.formatToResponse() })
  } catch (error) {
    console.error('[augh/login]', error)
    res.status(500).end()
  }
}

export const signup = async (req, res) => {
  if (!req.body.email || !req.body.password) {
    return res.status(400).send({ message: 'email and password needed' })
  }

  try {
    const userDoc = await Users.create(req.body)
    return res.status(201).send({ user: userDoc.formatToResponse() })
  } catch (error) {
    console.error('[auth/signup]', error)
    return res.status(500).send({ message: error.message })
  }
}

export default { login, signup }
