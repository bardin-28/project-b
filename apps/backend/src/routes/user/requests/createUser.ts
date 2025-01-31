import { Request, Response, Router } from 'express'
import { CreateUserRequest } from '@/src/routes/user/types'
import { monitoringRequestMs } from '@/monitoring'
import User from '@/database/models/user'
import { generateAccessToken, generateRefreshToken } from '@/src/shared/helpers'

const router = Router()

router.post(
  '/',
  async (
    req: Request<object, object, CreateUserRequest>,
    res: Response,
  ): Promise<void> => {
    const end = monitoringRequestMs.startTimer()

    const { email, password, role, restaurantId, storageId } = req.body

    try {
      const newUser = await User.create({
        email: 'example@example.com',
        password: 'securepassword',
        role: 'admin',
        restaurantId: null,
        storageId: null,
      })

      const accessToken = generateAccessToken(newUser.id)
      const refreshToken = generateRefreshToken(newUser.id)

      res.json({
        user: newUser,
        accessToken,
        refreshToken,
      })
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
