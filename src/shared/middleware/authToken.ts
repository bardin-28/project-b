import { NextFunction, Request, Response } from 'express'
import jwt from 'jsonwebtoken'
import User from '@/database/models/user'
import { AuthenticatedRequest, UserInstance } from '@/src/shared/types'
import { ACCESS_TOKEN_SECRET } from '@/src/shared/const'

export const authenticateToken = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  const authHeader = req.headers['authorization']
  const token = authHeader && authHeader.split(' ')[1]

  if (!token) {
    res.sendStatus(403).json({ message: 'Token not provided' })
    return
  }

  try {
    const decoded: any = jwt.verify(token, ACCESS_TOKEN_SECRET)

    const user = (await User.findOne({
      where: { email: decoded.email },
    })) as UserInstance | null

    if (!user) {
      res.sendStatus(404)
      return
    }

    ;(req as AuthenticatedRequest).user = user
    next()
  } catch (error) {
    console.error(error)
    res.sendStatus(403)
  }
}
