import { Router } from 'express'

import createUserRouter from './requests/createUser'
import getUserRouter from './requests/getUser'
import refreshTokenRouter from './requests/refreshToken'

const router = Router()

router.use('/', createUserRouter)
router.use('/', getUserRouter)
router.use('/', refreshTokenRouter)

export default router
