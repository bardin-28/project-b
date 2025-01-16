import { Router } from 'express'
import users from './users'
import user from './user'

const router = Router()

router.use('/users', users)
router.use('/user', user)

export default router
