import * as express from 'express';

interface User {
  email: string
  role: string
  restaurantId?: number | null
  storageId?: number | null
}

declare global {
  namespace Express {
    interface Request {
      user?: User
    }
  }
}
