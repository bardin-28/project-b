import { Request } from 'express'

export interface UserInstance {
  id: number
  email: string
  password: string
  role: UserRole
  restaurantId?: number | null
  storageId?: number | null
}

export interface AuthenticatedRequest extends Request {
  user?: UserInstance
}

export type UserRole =
  | 'admin'
  | 'owner'
  | 'warehouse_admin'
  | 'warehouse_member'
  | 'object_admin'
  | 'object_member'
