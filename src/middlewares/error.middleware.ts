import { injectable } from 'inversify';
import { Request, Response, NextFunction } from 'express';
//import { TYPES } from '../types';
//import { CustomError } from '../utils/errors';
// import winston from 'winston';

/**
 * Middleware class for error handling
 */
@injectable()
export class ErrorMiddleware {
  //constructor(@inject(TYPES.Logger) private logger: winston.Logger) {}
  constructor() {}
  handleError() {
    return (error: any, req: Request, res: Response, next: NextFunction) => {
      const status = 500;
      const message = error.message || 'Internal Server Error';
      // this.logger.error(`Error: ${message}`, { status, stack: error.stack });
      res.status(status).json({ error: message });
      next();
    };
  }
}
