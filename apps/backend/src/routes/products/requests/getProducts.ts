import { Router } from 'express'
import { monitoringRequestMs } from '@/monitoring'
import redisClient from '@/redis/client'
import Product from '@/database/models/product'

const router = Router()

router.get('/', async (req, res) => {
  const end = monitoringRequestMs.startTimer()

  try {
    const cachedProducts = await redisClient.get('products')

    if (cachedProducts) {
      res.json(JSON.parse(cachedProducts))
    } else {
      const products = await Product.findAll()
      await redisClient.setEx('products', 60, JSON.stringify(products))
      res.json(products)
    }
  } catch (err: any) {
    res.status(500).send(err.message)
  } finally {
    end({ method: req.method, route: req.route.path, code: res.statusCode })
  }
})

export default router
