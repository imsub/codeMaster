import { injectable } from 'inversify';
import jwt from 'jsonwebtoken';
import { IAuthStrategy } from '../interfaces';
import { CustomError } from '../utils/errors';

@injectable()
export class AuthStrategy implements IAuthStrategy {
  generateToken(user: {
    id: string;
    role?: string;
    email?: string;
    tokenType: string;
  }): string {
    const secret = process.env[`${user.tokenType.toUpperCase()}_TOKEN_SECRET`];
    const expiresIn =
      process.env[`${user.tokenType.toUpperCase()}_TOKEN_EXPIRY`];

    if (!secret || !expiresIn) {
      throw new CustomError('Token secret or expiry is not defined', 500);
    }

    const payload: Record<string, any> = {
      id: user.id,
    };

    if (user.tokenType.toUpperCase() === 'ACCESS') {
      if (user.email) payload.email = user.email;
      if (user.role) payload.role = user.role;
    }
    //jwt.sign({data: 'foobar'}, 'secret', { expiresIn: '1h' });

return jwt.sign(payload as object, secret as jwt.Secret, {
  expiresIn: parseInt(expiresIn || '86400', 10), // fallback to 1 day in seconds if undefined
});
  }

  verifyToken(token: string): { id: string; role: string } {
    try {
      const secret = process.env.JWT_SECRET;
      if (!secret) {
        throw new CustomError('JWT secret is not defined', 500);
      }

      const decoded = jwt.verify(token, secret);
      if (
        typeof decoded === 'object' &&
        decoded !== null &&
        'id' in decoded &&
        'role' in decoded
      ) {
        return decoded as { id: string; role: string };
      }

      throw new CustomError('Invalid token payload', 401);
    } catch (error) {
      throw new CustomError('Invalid token', 401);
    }
  }
}


