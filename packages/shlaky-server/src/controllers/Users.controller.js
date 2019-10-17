import Controller from './Controller'

class UsersController extends Controller {
  getOne = async (req, res) => {
    const { item, error } = await this.services.resource.users.getOne(req)

    if (error) {
      global.console.error('[users.getOne] error', error)
      res.status(400).send({ message: 'error finding user', error })
      return
    }

    const user = item.formatToResponse()
    res.status(200).json({ user })
  }

  getMany = async (req, res) => {
    const { collection, error } = await this.services.resource.users.getMany()
    if (error) {
      global.console.error('[users.getMany] error', error)
      res.status(400).send({ message: 'error getting users', error })
      return
    }
    const users = collection.map(item => item.formatToResponse())
    res.status(200).json({ users })
  }
}

export default UsersController
