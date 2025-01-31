import jwt from 'jsonwebtoken'
import { ACCESS_TOKEN_SECRET, REFRESH_TOKEN_SECRET } from '@/src/shared/const'

export const generateAccessToken = (id: number) => {
  return jwt.sign({ id: id }, ACCESS_TOKEN_SECRET, { expiresIn: '365d' }) // 365d for development
}

export const generateRefreshToken = (id: number) => {
  return jwt.sign({ id: id }, REFRESH_TOKEN_SECRET, { expiresIn: '7d' })
}
