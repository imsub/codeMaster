import { Counter, Histogram } from 'prom-client';
import client from 'prom-client';

/**
 * Class for managing Prometheus metrics
 */
export class MetricsManager {
  readonly register = new client.Registry();
  readonly requestCounter = new Counter({
    name: 'http_requests_total',
    help: 'Total number of HTTP requests',
    labelNames: ['method', 'route', 'status'],
    registers: [this.register],
  });
  readonly requestDuration = new Histogram({
    name: 'http_request_duration_seconds',
    help: 'Duration of HTTP requests in seconds',
    labelNames: ['method', 'route', 'status'],
    buckets: [0.1, 0.5, 1, 2, 5],
    registers: [this.register],
  });
}
