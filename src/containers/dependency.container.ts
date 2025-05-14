import { Container } from 'inversify';
import { TYPES } from '../types/type';
import { ErrorMiddleware, AuthMiddleware , ResponseMiddleware } from '../middlewares';
import { AuthRoutes } from '../routes/auth.route';
import { Router } from '../routes/index';
import { AuthValidator } from '../validators';

import { UserRepository } from '../repositories';
// import { ProblemService } from '../services/problem.service.ts';
// import { ProblemRepository } from '../repositories/problem.repository.ts';
// import { UserController } from '../controllers/user.controller.ts';
import { AuthController } from '../controllers/auth.controller';
// import { ProblemController } from '../controllers/problem.controller.ts';
import { LoggerFactory } from '../utils/logger';
//import { PrismaClient } from '@prisma/client';
import { CatchAsync } from '../utils';
// import { PrismaClient as db } from '../../prisma/generated/prisma/index.js';
import { PrismaClient } from '../../prisma/generated/prisma/index.js';
import { AuthService, AuthStrategy } from '../services';
import {
  IUserRepository,
  IProblemRepository,
  IUserService,
  IAuthService,
  IProblemService,
  IAuthStrategy,
} from '../interfaces/index';
import { CacheManager } from '../utils';
// //import type winston from 'winston';
import winston from 'winston';
import { App } from '../app';
import { DB } from '../db';
const container = new Container();

// Singleton for PrismaClient
const prisma = new PrismaClient();
container.bind<PrismaClient>(TYPES.PrismaClient).toConstantValue(prisma);
container.bind<AuthRoutes>(TYPES.AuthRoutes).to(AuthRoutes).inSingletonScope();
container.bind<Router>(TYPES.Router).to(Router).inSingletonScope();
// Singleton for Logger
const logger = LoggerFactory.createLogger();
container.bind<winston.Logger>(TYPES.Logger).toConstantValue(logger);

// // Repositories
container.bind<UserRepository>(TYPES.UserRepository).to(UserRepository).inSingletonScope();
container.bind<CacheManager>(TYPES.CacheManager).to(CacheManager).inSingletonScope();
container.bind<ResponseMiddleware>(TYPES.ResponseMiddleware).to(ResponseMiddleware).inSingletonScope();
// container
//   .bind<IProblemRepository>(TYPES.ProblemRepository)
//   .to(ProblemRepository).inSingletonScope();

// // Services
// container.bind<IUserService>(TYPES.UserService).to(UserService).inSingletonScope();
container.bind<AuthService>(TYPES.AuthService).to(AuthService).inSingletonScope();
// container.bind<IProblemService>(TYPES.ProblemService).to(ProblemService).inSingletonScope();

// // Authentication Strategy
container.bind<IAuthStrategy>(TYPES.AuthStrategy).to(AuthStrategy).inSingletonScope();

// // Controllers
// container.bind<UserController>(TYPES.UserController).to(UserController).inSingletonScope();
container.bind<AuthController>(TYPES.AuthController).to(AuthController).inSingletonScope();
container.bind<AuthValidator>(TYPES.AuthValidator).to(AuthValidator).inSingletonScope();
// container
//   .bind<ProblemController>(TYPES.ProblemController)
//   .to(ProblemController).inSingletonScope();
container.bind<ErrorMiddleware>(TYPES.ErrorMiddleware).to(ErrorMiddleware).inSingletonScope();
container.bind<AuthMiddleware>(TYPES.AuthMiddleware).to(AuthMiddleware).inSingletonScope();
// container.bind<PrismaClient>(TYPES.DB).to(DB).inSingletonScope();
// container.bind<PrismaClient>(TYPES.DB).toConstantValue(DB).inSingletonScope();
container.bind<CatchAsync>(TYPES.CatchAsync).to(CatchAsync).inSingletonScope();
container.bind<App>(TYPES.App).to(App).inSingletonScope();
console.log(container);
export { container };
