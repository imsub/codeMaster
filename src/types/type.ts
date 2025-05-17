const TYPES = {
  Express: Symbol.for("Express"),
  PrismaClient: Symbol.for("PrismaClient"),
  UserRepository: Symbol.for("UserRepository"),
  ProblemRepository: Symbol.for("ProblemRepository"),
  UserService: Symbol.for("UserService"),
  ProblemService: Symbol.for("ProblemService"),
  UserController: Symbol.for("UserController"),
  AuthController: Symbol.for("AuthController"),
  ProblemController: Symbol.for("ProblemController"),
  Bcrypt: Symbol.for("Bcrypt"),
  Jwt: Symbol.for("Jwt"),
  Joi: Symbol.for("Joi"),
  Logger: Symbol.for("Logger"),
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
  App: Symbol.for("App"),
  AuthStrategy: Symbol.for("AuthStrategy"),
  Router: Symbol.for("Router"),
  AsyncHandler: Symbol.for("AsyncHandler"),
  Server: Symbol.for("Server"),
  CatchAsync: Symbol.for("CatchAsync"),
  DB: Symbol.for("DB"),
  CacheManager: Symbol.for("CacheManager"),
  ResponseMiddleware: Symbol.for("ResponseMiddleware"),
  ProblemValidator: Symbol.for("ProblemValidator"),
  ProblemRoutes: Symbol.for("ProblemRoutes"),
  Judge0Service: Symbol.for("Judge0Service"),
  SubmissionRoutes: Symbol.for("SubmissionRoutes"),
  SubmissionValidator: Symbol.for("SubmissionValidator"),
  SubmissionRepository: Symbol.for("SubmissionRepository"),
  SubmissionController: Symbol.for("SubmissionController"),
  SubmissionService: Symbol.for("SubmissionService"),
  JwtTokenValidator: Symbol.for("JwtTokenValidator"),
  PlaylistService: Symbol.for("PlaylistService"),
  ExecuteCodeService: Symbol.for("ExecuteCodeService"),
  PlaylistRoutes: Symbol.for("PlaylistRoutes"),
  ExecuteCodeRoutes: Symbol.for("ExecuteCodeRoutes"),
  PlaylistRepository: Symbol.for("PlaylistRepository"),
  TestCaseResultRepository: Symbol.for("TestCaseResultRepository"),
  ProblemSolvedRepository: Symbol.for("ProblemSolvedRepository"),
  ProblemInPlaylistRepository: Symbol.for("ProblemInPlaylistRepository"),
  ProblemInPlaylistService: Symbol.for("ProblemInPlaylistService"),
  ExecuteCodeController: Symbol.for("ExecuteCodeController"),
  ExecuteCodeValidator: Symbol.for("ExecuteCodeValidator"),
  ProblemSolvedService: Symbol.for("ProblemSolvedService"),
};
export {TYPES};
// export interface ILoggerService {
//   info(message: string, meta?: object): void;
//   error(message: string, meta?: object): void;
//   warn(message: string, meta?: object): void;
// }

// export interface IConfigService {
//   get(key: string): string | number;
// }

// export interface IUserModel {
//   create(userData: {
//     name: string;
//     email: string;
//     password: string;
//   }): Promise<any>;
//   findByEmail(email: string): Promise<any>;
//   findById(id: number): Promise<any>;
// }

// export interface IAuthService {
//   register(data: {
//     name: string;
//     email: string;
//     password: string;
//   }): Promise<any>;
//   login(data: { email: string; password: string }): Promise<any>;
// }

// export interface IAuthValidator {
//   validateRegister(data: {
//     name: string;
//     email: string;
//     password: string;
//   }): void;
//   validateLogin(data: { email: string; password: string }): void;
// }

// export interface IAuthMiddleware {
//   validateToken(req: any, res: any, next: any): Promise<any>;
// }

// export interface IErrorMiddleware {
//   handleError(err: any, req: any, res: any, next: any): void;
// }

// export interface IRequestScopeMiddleware {
//   setupRequestScope(req: any, res: any, next: any): void;
// }

// export interface IAuthRoutes {
//   getRouter(): any;
// }

// export interface ICustomError {
//   new (message: string, statusCode: number): Error & { statusCode: number };
// }
