import Controller from './Controller'

class AuthController extends Controller {
  invalidMessage = 'user or password are invalid'

  missingFieldsMessage = 'Email and password are needed'

  login = async (req, res) => {
    const { email, password } = req.body

    if (!email || !password) {
      res.status(400).send({ message: this.missingFieldsMessage })
      return
    }

    const { item, error } = await this.services.resource.user.getOne({ email })

    if (error) {
      res
        .status(400)
        .send({ message: 'There was an error, please try again', error })
      return
    }

    if (!item) {
      res.status(401).send({ message: this.invalidMessage })
      return
    }

    const passwordMatches = await item.checkPassword(password)
    if (!passwordMatches) {
      res.status(401).send({ message: this.invalidMessage })
      return
    }

    const token = this.utils.auth.newToken(user)
    const user = { token, ...item.formatToResponse() }
    res.status(200).json({ user })
  }

  signup = async (req, res) => {
    const { email, password } = req.body
    if (!email || !password) {
      res.status(400).send({ message: this.missingFieldsMessage })
      return
    }

    const { item, error } = await this.services.resource.user.createOne({
      email,
      password,
    })

    if (error) {
      res
        .status(400)
        .send({ message: 'There was an error, please try again', error })
      return
    }

    const token = this.utils.auth.newToken(user)
    const user = { token, ...item.formatToResponse() }
    res.status(201).json({ user })
  }
}

export default AuthController
