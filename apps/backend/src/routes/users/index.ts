import getUsers from './requests/getUsers'
import { Router } from 'express'

const router = Router()

router.use('/', getUsers)

export default router
