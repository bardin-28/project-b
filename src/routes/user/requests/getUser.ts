import { Router } from 'express'
import { monitoringRequestMs } from '@/monitoring'
import { AuthenticatedRequest } from '@/src/shared/types'
import { authenticateToken } from '@/src/shared/middleware/authToken'

const router = Router()

/**
 * @swagger
 *
 * tags:
 *   - name: User
 *     description: Operations related to user
 *
 * /api/user:
 *   get:
 *     tags:
 *       - User
 *     summary: Get the authenticated user
 *     description: Retrieve the authenticated user's information based on the provided token.
 *     responses:
 *       '200':
 *         description: Authenticated user's information.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 user:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: integer
 *                       example: 1
 *                     name:
 *                       type: string
 *                       example: "John Doe"
 *                     email:
 *                       type: string
 *                       example: "john.doe@example.com"
 *                     role:
 *                       type: string
 *                       example: "admin"
 *                     restaurantId:
 *                       type: integer
 *                       example: 42
 *                     storageId:
 *                       type: integer
 *                       example: 8
 *       '401':
 *         description: Unauthorized. Token is missing or invalid.
 *       '404':
 *         description: User not found.
 *       '500':
 *         description: Internal server error.
 */

router.get('/', authenticateToken, async (req, res) => {
  const end = monitoringRequestMs.startTimer()

  try {
    const user = (req as AuthenticatedRequest).user

    if (!user) {
      res.status(404).json({ message: 'User not found' })
      return
    }

    res.json({
      user,
    })
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
})

export default router
