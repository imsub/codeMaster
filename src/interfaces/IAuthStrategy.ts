export interface IAuthStrategy {
  generateToken(user: {id: string; role?: string}): string;
  verifyToken(token: string): {id: string; role: string};
}
