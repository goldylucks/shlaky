import { Router } from 'express'
import controllers from './tasks.controllers'
import { protect } from '../../utils/auth'

const router = Router()

router
  .route('/')
  .get(protect, controllers.getMany)
  .post(protect, controllers.createOne)

router
  .route('/:id')
  .get(protect, controllers.getOne)
  .put(protect, controllers.updateOne)
  .delete(protect, controllers.removeOne)

export default router
