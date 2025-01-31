import getProducts from './requests/getProducts'
import { Router } from 'express'

const router = Router()

router.use('/', getProducts)

export default router
