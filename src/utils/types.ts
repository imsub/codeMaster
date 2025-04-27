export const TYPES = {
  Express: Symbol.for("Express"),
  PrismaClient: Symbol.for("PrismaClient"),
  Bcrypt: Symbol.for("Bcrypt"),
  Jwt: Symbol.for("Jwt"),
  Joi: Symbol.for("Joi"),
  Winston: Symbol.for("Winston"),
  CustomError: Symbol.for("CustomError"),
  LoggerService: Symbol.for("LoggerService"),
  ConfigService: Symbol.for("ConfigService"),
  UserModel: Symbol.for("UserModel"),
  AuthService: Symbol.for("AuthService"),
  AuthValidator: Symbol.for("AuthValidator"),
  AuthMiddleware: Symbol.for("AuthMiddleware"),
  ErrorMiddleware: Symbol.for("ErrorMiddleware"),
  RequestScopeMiddleware: Symbol.for("RequestScopeMiddleware"),
  AuthRoutes: Symbol.for("AuthRoutes"),
  Container: Symbol.for("Container"),
};
// export type Express = any; // Placeholder for express type
// export type PrismaClient = any; // Placeholder for PrismaClient type
// export type Bcrypt = any; // Placeholder for bcrypt type
// export type Jwt = any; // Placeholder for jsonwebtoken type
// export type Joi = any; // Placeholder for joi type
// export type Winston = any; // Placeholder for winston type
// export type CustomError = any; // Placeholder for CustomError type
// export type LoggerService = any; // Placeholder for LoggerService type
// export type ConfigService = any; // Placeholder for ConfigService type
// export type UserModel = any; // Placeholder for UserModel type
// export type AuthService = any; // Placeholder for AuthService type
// export type AuthValidator = any; // Placeholder for AuthValidator type
// export type AuthMiddleware = any; // Placeholder for AuthMiddleware type
// export type ErrorMiddleware = any; // Placeholder for ErrorMiddleware type
// export type RequestScopeMiddleware = any; // Placeholder for RequestScopeMiddleware type
// export type AuthRoutes = any; // Placeholder for AuthRoutes type
// export type Container = any; // Placeholder for Container type

export interface ILoggerService {
  info(message: string, meta?: object): void;
  error(message: string, meta?: object): void;
  warn(message: string, meta?: object): void;
}

export interface IConfigService {
  get(key: string): string | number;
}

export interface IUserModel {
  create(userData: { name: string; email: string; password: string }): Promise<any>;
  findByEmail(email: string): Promise<any>;
  findById(id: number): Promise<any>;
}

export interface IAuthService {
  register(data: { name: string; email: string; password: string }): Promise<any>;
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
