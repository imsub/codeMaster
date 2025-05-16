declare global {
  namespace Express {
    interface Response {
      sendResponse(data: any, message?: string, statusCode?: number): Response;
    }
  }
}

import { Request, Response, NextFunction } from 'express';
import { injectable } from 'inversify';

@injectable()
export class ResponseMiddleware {
  constructor() {}

  sendResponse() {
    return (req: Request, res: Response, next: NextFunction) => {
      res.sendResponse = function (
        data,
        message = 'Success',
        statusCode = 200
      ) {
        if (
          !Number.isInteger(statusCode) ||
          statusCode < 100 ||
          statusCode > 599
        ) {
          statusCode = 500;
          message = 'Invalid status code';
        }
        return res.status(statusCode).json({
          status: statusCode < 400 ? 'success' : 'error',
          data: data || null,
          message,
          timestamp: new Date().toISOString(),
        });
      };
      next();
    };
  }
}
