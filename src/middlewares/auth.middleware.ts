import { injectable, inject } from 'inversify';
import { Request, Response, NextFunction } from 'express';

declare global {
  namespace Express {
    interface Request {
      user?: {
        id: String;
        role?: String;
        email?: String;
      };
    }
  }
}
import { TYPES } from '../types';
import { AuthService } from '../services';
//import { CustomError } from '../utils/errors';
import jwt from 'jsonwebtoken';

@injectable()
export class AuthMiddleware {
  constructor(
    @inject(TYPES.AuthService) private authService: AuthService,
  ) {
    this.authService = authService;
  }

  authenticate(tokenType: String):any {
    return async (
      //tokenType: String,
      req: Request,
      res: Response,
      next: NextFunction
    ) => {
      const token =
        tokenType.toUpperCase() === 'ACCESS'
          ? req.cookies.accessToken
          : req.cookies.refreshToken;
      const secret = process.env[`${tokenType.toUpperCase()}_TOKEN_SECRET`];
      if (!secret)
        return res.status(500).json({ error: 'Token secret not configured' });

      if (!token) return res.status(401).json({ error: 'Token missing' });
      jwt.verify(
        token,
        secret,
        async (err: jwt.VerifyErrors | null, decoded: any) => {
          if (err) {
            // Handle expired or invalid token
            return res.status(401).json({ error: err.message });
          }
          const { id, role , email } = decoded as {
            id: string;
            role ?: string;
            email?: string;
          };
          const response = await this.authService.getRecordByMultipleFields({
            id,
            ...(role  && { role  }),
            ...(email && { email }),
          });
          if (!!response) {
            req.user = {
              id,
              role: response.role,
              email: response.email,
            };
            next();
          } else {
            return res.status(404).json({ error: 'Unauthoried' });
          }
        }
      );
    };
  }
}
