//import { App } from './app.ts';
//import { TracingManager } from './observability/tracing';
import 'reflect-metadata';
import { container } from './containers/dependency.container';
//import { injectable, inject } from 'inversify';
import { TYPES } from './types/index';
import { App } from './app';
import winston from 'winston';

/**
 * Class for starting the server
 */

export class Server {
  private logger: winston.Logger;
  //private tracingManager: TracingManager;

  constructor() {
    this.logger = winston.createLogger({
      level: 'info',
      format: winston.format.combine(
        winston.format.timestamp(),
        winston.format.json()
      ),

      transports: [new winston.transports.Console()],
    });
    //this.tracingManager = new TracingManager();
  }

  async start() {
    try {
      //await this.tracingManager.startTracing();

      const appInstance = container.get<App>(TYPES.App);
      const app = appInstance.getApp();
      const port = process.env.PORT || 3000;
      app.listen(port, () => {
        this.logger.info(`Server running on port ${port}`);
      });

      process.on('SIGTERM', async () => {
        this.logger.info('SIGTERM received, shutting down');
        //await this.tracingManager.shutdownTracing();
        process.exit(0);
      });
    } catch (err) {
      this.logger.error('Failed to start server:', err);
      console.error('Failed to start server:', err);
      process.exit(1);
    }
  }
}

const server = new Server();
server.start();
