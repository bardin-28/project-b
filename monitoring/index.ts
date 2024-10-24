import client from "prom-client";

const monitoringRegister = new client.Registry();

client.collectDefaultMetrics({ register: monitoringRegister });

export const monitoringRequestMs = new client.Histogram({
    name: 'http_request_duration_ms',
    help: 'Duration of HTTP requests in ms',
    labelNames: ['method', 'route', 'code'],
    buckets: [50, 100, 200, 300, 400, 500]
});

monitoringRegister.registerMetric(monitoringRequestMs);

export default monitoringRegister
