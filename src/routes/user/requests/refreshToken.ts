import { Request, Response, Router } from 'express'
import jwt from 'jsonwebtoken'
import { REFRESH_TOKEN_SECRET } from '@/src/shared/const'
import User from '@/database/models/user'
import { generateAccessToken } from '@/src/shared/helpers'
import { monitoringRequestMs } from '@/monitoring'

const router = Router()

/**
 * @swagger
 * tags:
 *   - name: User
 *     description: Authentication and token management
 *
 * /api/user/refresh-token:
 *   post:
 *     summary: Refresh the access token
 *     description: Generates a new access token using a valid refresh token.
 *     tags:
 *       - User
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               refreshToken:
 *                 type: string
 *                 description: The refresh token to validate and generate a new access token.
 *                 example: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
 *     responses:
 *       '200':
 *         description: Successfully generated a new access token.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 accessToken:
 *                   type: string
 *                   description: The newly generated access token.
 *                   example: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
 *       '401':
 *         description: Unauthorized. Refresh token is missing in the request body.
 *       '403':
 *         description: Forbidden. Refresh token is invalid or user not found.
 *       '500':
 *         description: Internal server error.
 */

router.post(
  '/refresh-token',
  async (
    req: Request<object, object, { refreshToken: string }>,
    res: Response,
  ): Promise<void> => {
    const end = monitoringRequestMs.startTimer()

    const { refreshToken } = req.body

    if (!refreshToken) {
      res.sendStatus(401)
      end({
        method: req.method,
        route: req.route?.path || '',
        code: res.statusCode,
      })

      return
    }

    try {
      const decoded: any = jwt.verify(refreshToken, REFRESH_TOKEN_SECRET)

      const user = await User.findOne({ where: { id: decoded.id } })

      if (!user) {
        res.sendStatus(403)
        return
      }

      const newAccessToken = generateAccessToken(user.id)

      res.json({ accessToken: newAccessToken })
    } catch (error) {
      end({
        method: req.method,
        route: req.route?.path || '',
        code: res.statusCode,
      })

      console.error(error)
      res.sendStatus(403)
    }
  },
)

export default router
