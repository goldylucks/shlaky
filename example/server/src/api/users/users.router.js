import { Router } from 'express'
import { getOne, getMany, me } from './users.controllers'
import { protect } from '../../utils/auth'

const router = Router()

router.get('/', getMany)

router.get('/me', protect, me)

router.get('/:id', getOne)


export default router

