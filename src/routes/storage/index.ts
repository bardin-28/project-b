import { Router } from 'express'

import createStorage from './requests/createStorage'
import getStorage from './requests/getStorage'

const router = Router()

router.use('/', createStorage)
router.use('/', getStorage)

export default router
