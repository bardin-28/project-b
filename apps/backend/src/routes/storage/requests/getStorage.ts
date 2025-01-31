import { Request, Router } from 'express'
import { monitoringRequestMs } from '@/monitoring'
import { authenticateToken } from '@/src/shared/middleware/authToken'
import redisClient from '@/redis/client'
import Storage from '@/database/models/storage'

const router = Router()

/**
 * @swagger
 *
 * tags:
 *   - name: Storage
 *     description: Operations related to storage
 *
 * /api/storage:
 *   get:
 *     tags:
 *       - Storage
 *     summary: Retrieve a single storage item
 *     description: Retrieve storage details by ID.
 *     parameters:
 *       - in: query
 *         name: id
 *         required: true
 *         description: Numeric ID of the storage to retrieve.
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: A storage object.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                   description: The storage ID.
 *       400:
 *         description: Invalid ID supplied
 *       404:
 *         description: Storage not found
 *       500:
 *         description: Server error
 */

router.get(
  '/',
  authenticateToken,
  async (req: Request<object, object, { id: number }>, res) => {
    const end = monitoringRequestMs.startTimer()

    const { id } = req.query

    try {
      const storage = await Storage.findOne({
        where: { id: id },
      })
      await redisClient.setEx('storage', 60, JSON.stringify(storage))
      res.json(storage || {})
    } catch (err: any) {
      console.error(err)
      res.status(500).send(err.message)
    } finally {
      end({
        method: req.method,
        route: req.route?.path || '',
        code: res.statusCode,
      })
    }
  },
)

export default router
