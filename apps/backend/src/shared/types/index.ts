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

export type ProductUnits = 'kg' | 'count' | 'litres'

export type ProductCategories =
  | 'vegetables_and_fruits'
  | 'meat_and_poultry'
  | 'fish_and_seafood'
  | 'dairy'
  | 'grains_and_cereals'
  | 'spices_and_condiments'
  | 'frozen_foods'
  | 'beverages'
  | 'bakery_and_confectionery'
  | 'canned_and_preserved_foods'
  | 'nuts_and_dried_fruits'
  | 'grocery_items'
  | 'other'
