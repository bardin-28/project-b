import { Router } from 'express'
import users from './users'
import user from './user'
import products from './products'
import storage from './storage'

const router = Router()

router.use('/users', users)
router.use('/user', user)
router.use('/products', products)
router.use('/storage', storage)

export default router
