import client from 'prom-client'

const monitoringRegister = new client.Registry()

client.collectDefaultMetrics({ register: monitoringRegister })

export const monitoringRequestMs = new client.Histogram({
  name: 'http_request_duration_ms',
  help: 'Duration of HTTP requests in ms',
  labelNames: ['method', 'route', 'code'],
})

monitoringRegister.registerMetric(monitoringRequestMs)

export default monitoringRegister
