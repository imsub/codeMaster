/**
 
Return a function that catches and forwards any error a function throws to the next middleware
@param {Class}  - input class that catchAsync wraps around*/

import { injectable } from 'inversify';
import { Request, Response, NextFunction } from 'express';

/**
 * Class for wrapping async route handlers to catch errors
 */
@injectable()
export class CatchAsync {
  handle(
    fn: (req: Request, res: Response, next: NextFunction) => Promise<any>
  ) {
    return (req: Request, res: Response, next: NextFunction) => {
      Promise.resolve(fn(req, res, next)).catch(next);
    };
  }
}
