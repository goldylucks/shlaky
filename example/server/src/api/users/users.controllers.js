import { Users } from './users.model'

export const getOne = async (req, res) => {
  try {
    res.status(200).json(userDoc.formatToResponse())
  } catch (error) {
    console.error('[users.getOne] error', error)
    res.status(400).send({ message: `error finding user ${error.message}` })
  }
}

export const getMany = async (req, res) => {
  try {
    const users = await Users.find()
    res.status(200).json({ users })
  } catch (error) {
    console.error('[users.getMany] error', error)
    res.status(400).send({ message: `error getting users ${error.message}` })
  }
}

export const me = (req, res) => {
  res.status(200).json({ user: req.user.formatToResponse() })
}
