export interface CreateUserRequest {
  email: string
  password: string
  role: string | null
  restaurantId?: number | null
  storageId?: number | null
}
