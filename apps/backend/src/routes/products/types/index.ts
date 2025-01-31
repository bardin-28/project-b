export type ProductInstance = {
  ownerId: number
  ownerType: 'Restaurant' | 'Storage'
  name: string
  category: string
  unit: string
  quantity: number
  description?: string | null
  cost: number
  expired_date: Date
}
