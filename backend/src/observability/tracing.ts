import {NodeSDK} from "@opentelemetry/sdk-node";
import {OTLPTraceExporter} from "@opentelemetry/exporter-trace-otlp-http";
import {Resource} from "@opentelemetry/resources";
import {SemanticResourceAttributes} from "@opentelemetry/semantic-conventions";
import {ExpressInstrumentation} from "@opentelemetry/instrumentation-express";
import {HttpInstrumentation} from "@opentelemetry/instrumentation-http";

/**
 * Class for managing OpenTelemetry tracing
 */
export class TracingManager {
  private sdk: NodeSDK;

  constructor() {
    const exporter = new OTLPTraceExporter({
      url: process.env.OTEL_EXPORTER_OTLP_ENDPOINT,
    });
    this.sdk = new NodeSDK({
      resource: new Resource({
        [SemanticResourceAttributes.SERVICE_NAME]: "leetlab-backend",
      }),
      traceExporter: exporter,
      instrumentations: [
        new ExpressInstrumentation(),
        new HttpInstrumentation(),
      ],
    });
  }

  async startTracing() {
    this.sdk.start();
  }

  async shutdownTracing() {
    await this.sdk.shutdown();
  }
}
