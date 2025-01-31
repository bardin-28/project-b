import { Router } from 'express'
import users from './users'
import user from './user'
import products from './products'

const router = Router()

router.use('/users', users)
router.use('/user', user)
router.use('/products', products)

export default router
