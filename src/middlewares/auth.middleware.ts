export class AuthMiddleware {
  private logger: any;
  private jwt: any;
  private CustomError: any;

  constructor(deps: { loggerService: any; jwt: any; CustomError: any }) {
    this.logger = deps.loggerService;
    this.jwt = deps.jwt;
    this.CustomError = deps.CustomError;
  }

  async validateToken(req: any, res: any, next: any): Promise<void> {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) {
      this.logger.warn("No token provided", { path: req.path });
      throw new this.CustomError("No token provided", 401);
    }

    try {
      const decoded = this.jwt.verify(token, process.env.JWT_SECRET);
      req.user = decoded;
      this.logger.info("Token validated", { userId: decoded.id });
      next();
    } catch (error: any) {
      this.logger.error("Invalid token", { error: error.message });
      throw new this.CustomError("Invalid token", 401);
    }
  }
}
