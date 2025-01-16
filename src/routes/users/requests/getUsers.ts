import { Router } from 'express'
import { monitoringRequestMs } from '@/monitoring'
import redisClient from '@/redis/client'
import User from '@/database/models/user'

const router = Router()

/**
 * @swagger
 * tags:
 *   - name: Users
 *     description: Operations about users
 * /api/users:
 *   get:
 *     tags:
 *       - Users
 *     summary: Get all users
 *     description: Retrieve a list of users, either from cache or database.
 *     responses:
 *       '200':
 *         description: A list of users.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                     example: 1
 *                   name:
 *                     type: string
 *                     example: "John Doe"
 *                   email:
 *                     type: string
 *                     example: "john.doe@example.com"
 *       '500':
 *         description: Server error.
 */

router.get('/', async (req, res) => {
  const end = monitoringRequestMs.startTimer()

  try {
    const cachedUsers = await redisClient.get('users')

    if (cachedUsers) {
      res.json(JSON.parse(cachedUsers))
    } else {
      const users = await User.findAll()
      await redisClient.setEx('users', 60, JSON.stringify(users))
      res.json(users)
    }
  } catch (err: any) {
    res.status(500).send(err.message)
  } finally {
    end({ method: req.method, route: req.route.path, code: res.statusCode })
  }
})

export default router
