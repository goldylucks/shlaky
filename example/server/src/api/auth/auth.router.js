import { Router } from 'express'
import controllers from './auth.controllers'

const router = Router()

router.route('/login').post(controllers.login)
router.route('/signup').post(controllers.signup)

export default router
