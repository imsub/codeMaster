import { Container } from 'inversify';
import { TYPES } from '../types';
import {
  ErrorMiddleware,
  AuthMiddleware,
  ResponseMiddleware,
} from '../middlewares';
import { AuthRoutes } from '../routes/auth.route';
import { ProblemRoutes } from '../routes/problem.route';
import { SubmissionRoutes } from '../routes/submission.route';
import { Router } from '../routes';
import { AuthValidator, ProblemValidator , SubmissionValidator , JwtTokenValidator} from '../validators';
import { UserRepository, ProblemRepository  , SubmissionRepository } from '../repositories';
import { AuthController, ProblemController , SubmissionController } from '../controllers';
import { CatchAsync, LoggerFactory, CacheManager } from '../utils';
import { PrismaClient } from '../../prisma/generated/prisma/index.js';
import {
  AuthService,
  AuthStrategy,
  ProblemService,
  Judge0Service,
  SubmissionService
} from '../services';
import {
  IUserRepository,
  IProblemRepository,
  IUserService,
  IAuthService,
  IProblemService,
  IAuthStrategy,
} from '../interfaces';
import winston from 'winston';
import { App } from '../app';
import { DB } from '../db';
const container = new Container();

// Singleton for PrismaClient
const prisma = new PrismaClient();
container.bind<PrismaClient>(TYPES.PrismaClient).toConstantValue(prisma);
container.bind<AuthRoutes>(TYPES.AuthRoutes).to(AuthRoutes).inSingletonScope();
container.bind<SubmissionRoutes>(TYPES.SubmissionRoutes).to(SubmissionRoutes).inSingletonScope();
container
  .bind<ProblemRoutes>(TYPES.ProblemRoutes)
  .to(ProblemRoutes)
  .inSingletonScope();
container.bind<Router>(TYPES.Router).to(Router).inSingletonScope();
// Singleton for Logger
const logger = LoggerFactory.createLogger();
container.bind<winston.Logger>(TYPES.Logger).toConstantValue(logger);

// // Repositories
container
  .bind<UserRepository>(TYPES.UserRepository)
  .to(UserRepository)
  .inSingletonScope();
container
  .bind<ProblemRepository>(TYPES.ProblemRepository)
  .to(ProblemRepository)
  .inSingletonScope();
container
  .bind<SubmissionRepository>(TYPES.SubmissionRepository)
  .to(SubmissionRepository)
  .inSingletonScope();
container
  .bind<CacheManager>(TYPES.CacheManager)
  .to(CacheManager)
  .inSingletonScope();
container
  .bind<ResponseMiddleware>(TYPES.ResponseMiddleware)
  .to(ResponseMiddleware)
  .inSingletonScope();

// // Services

container
  .bind<AuthService>(TYPES.AuthService)
  .to(AuthService)
  .inSingletonScope();
container
  .bind<SubmissionService>(TYPES.SubmissionService)
  .to(SubmissionService)
  .inSingletonScope();
container
  .bind<ProblemService>(TYPES.ProblemService)
  .to(ProblemService)
  .inSingletonScope();
container
  .bind<Judge0Service>(TYPES.Judge0Service)
  .to(Judge0Service)
  .inSingletonScope();

container
  .bind<IAuthStrategy>(TYPES.AuthStrategy)
  .to(AuthStrategy)
  .inSingletonScope();

// // Controllers

container
  .bind<AuthController>(TYPES.AuthController)
  .to(AuthController)
  .inSingletonScope();
container
  .bind<SubmissionController>(TYPES.SubmissionController)
  .to(SubmissionController)
  .inSingletonScope();
container
  .bind<ProblemController>(TYPES.ProblemController)
  .to(ProblemController)
  .inSingletonScope();
container
  .bind<AuthValidator>(TYPES.AuthValidator)
  .to(AuthValidator)
  .inSingletonScope();
container
  .bind<ProblemValidator>(TYPES.ProblemValidator)
  .to(ProblemValidator)
  .inSingletonScope();
container
  .bind<SubmissionValidator>(TYPES.SubmissionValidator)
  .to(SubmissionValidator)
  .inSingletonScope();
container
  .bind<JwtTokenValidator>(TYPES.JwtTokenValidator)
  .to(JwtTokenValidator)
  .inSingletonScope();
// container

container
  .bind<ErrorMiddleware>(TYPES.ErrorMiddleware)
  .to(ErrorMiddleware)
  .inSingletonScope();
container
  .bind<AuthMiddleware>(TYPES.AuthMiddleware)
  .to(AuthMiddleware)
  .inSingletonScope();
// container.bind<PrismaClient>(TYPES.DB).to(DB).inSingletonScope();
// container.bind<PrismaClient>(TYPES.DB).toConstantValue(DB).inSingletonScope();
container.bind<CatchAsync>(TYPES.CatchAsync).to(CatchAsync).inSingletonScope();
container.bind<App>(TYPES.App).to(App).inSingletonScope();

export { container };
