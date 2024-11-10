import swaggerJSDoc from 'swagger-jsdoc'
import swaggerUi from 'swagger-ui-express'
import { Express } from 'express'

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'API Documentation',
      version: '1.0.0',
      description: 'API documentation for the Node.js + TypeScript project',
    },
  },
  apis: ['./src/**/*.ts'],
}

const swaggerSpec = swaggerJSDoc(options)

console.log(swaggerSpec)

export const setupSwagger = (app: Express) => {
  app.use(
    '/api-docs',
    swaggerUi.serve,
    swaggerUi.setup(swaggerSpec, { explorer: true }),
  )
}
