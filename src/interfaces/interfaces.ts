export interface ILoggerService {
  info(message: string, meta?: object): void;
  error(message: string, meta?: object): void;
  warn(message: string, meta?: object): void;
}

export interface IConfigService {
  get(key: string): string | number;
}

export interface IUserModel {
  create(userData: {
    name: string;
    email: string;
    password: string;
  }): Promise<any>;
  findByEmail(email: string): Promise<any>;
  findById(id: number): Promise<any>;
}

export interface IAuthService {
  register(data: {
    name: string;
    email: string;
    password: string;
  }): Promise<any>;
  login(data: { email: string; password: string }): Promise<any>;
}

export interface IAuthValidator {
  validateRegister(data: {
    name: string;
    email: string;
    password: string;
  }): void;
  validateLogin(data: { email: string; password: string }): void;
}

export interface IAuthMiddleware {
  validateToken(req: any, res: any, next: any): Promise<any>;
}

export interface IErrorMiddleware {
  handleError(err: any, req: any, res: any, next: any): void;
}

export interface IRequestScopeMiddleware {
  setupRequestScope(req: any, res: any, next: any): void;
}

export interface IAuthRoutes {
  getRouter(): any;
}

export interface ICustomError {
  new (message: string, statusCode: number): Error & { statusCode: number };
}
