import { Request, Response, Router } from 'express'
import { monitoringRequestMs } from '@/monitoring'

import { authenticateToken } from '@/src/shared/middleware/authToken'
import Storage from '@/database/models/storage'
import { CreateStorageType } from '../types'

const router = Router()

/**
 * @swagger
 *
 * tags:
 *   - name: Storage
 *     description: Operations related to storage
 *
 * /api/storage:
 *   post:
 *     tags:
 *       - Storage
 *     summary: Create a new storage item
 *     description: Creates a new storage entity with the provided details.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 description: Email associated with the storage.
 *               name:
 *                 type: string
 *                 description: Name of the storage.
 *               phone:
 *                 type: string
 *                 nullable: true
 *                 description: Phone number of the storage.
 *               location:
 *                 type: string
 *                 nullable: true
 *                 description: Location of the storage.
 *     responses:
 *       200:
 *         description: Successfully created a new storage item.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                   description: The newly created storage ID.
 *                 email:
 *                   type: string
 *                   description: Email associated with the storage.
 *                 name:
 *                   type: string
 *                   description: Name of the storage.
 *                 phone:
 *                   type: string
 *                   nullable: true
 *                   description: Phone number of the storage.
 *                 location:
 *                   type: string
 *                   nullable: true
 *                   description: Location of the storage.
 *       500:
 *         description: Internal Server Error
 */

router.post(
  '/',
  authenticateToken,
  async (
    req: Request<object, object, CreateStorageType>,
    res: Response,
  ): Promise<void> => {
    const end = monitoringRequestMs.startTimer()
    const { email, name, phone, location } = req.body

    try {
      const newStorage = await Storage.create({
        email: email ?? 'example@example.com',
        name: name ?? 'Example Storage',
        phone: phone ?? '+380993691888',
        location: location ?? 'Kyiv',
      })

      res.json(newStorage)
    } catch (err) {
      console.error(err)
      res.status(500).send('Internal Server Error')
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
