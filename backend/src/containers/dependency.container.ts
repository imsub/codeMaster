import {Container} from "inversify";
import {TYPES} from "../types";
import {
  ErrorMiddleware,
  AuthMiddleware,
  ResponseMiddleware,
} from "../middlewares";
import {AuthRoutes} from "../routes/auth.route";
import {ProblemRoutes} from "../routes/problem.route";
import {SubmissionRoutes} from "../routes/submission.route";
import {ExecuteCodeRoutes} from "../routes/executeCode.route";
import {PlaylistRoutes} from "../routes/playlist.route";
import {Router} from "../routes";
import {
  AuthValidator,
  ProblemValidator,
  SubmissionValidator,
  JwtTokenValidator,
  ExecuteCodeValidator,
  PlaylistValidator,
} from "../validators";
import {
  UserRepository,
  ProblemRepository,
  SubmissionRepository,
  PlaylistRepository,
  ProblemInPlaylistRepository,
  ProblemSolvedRepository,
  TestCaseResultRepository,
} from "../repositories";
import {
  AuthController,
  ProblemController,
  SubmissionController,
  ExecuteCodeController,
  PlaylistController,
} from "../controllers";
import {CatchAsync, LoggerFactory, CacheManager} from "../utils";
import {PrismaClient} from "../../prisma/generated/prisma/index.js";
import {
  AuthService,
  AuthStrategy,
  ProblemService,
  Judge0Service,
  SubmissionService,
  ProblemInPlaylistService,
  ExecuteCodeService,
  PlaylistService,
  ProblemSolvedService,
  TestCaseResultService,
} from "../services";
import {
  IUserRepository,
  IProblemRepository,
  IUserService,
  IAuthService,
  IProblemService,
  IAuthStrategy,
} from "../interfaces";
import winston from "winston";
import {App} from "../app";
import {DB} from "../db";
const container = new Container();

// Singleton for PrismaClient
const prisma = new PrismaClient();
container.bind<PrismaClient>(TYPES.PrismaClient).toConstantValue(prisma);
container.bind<AuthRoutes>(TYPES.AuthRoutes).to(AuthRoutes).inSingletonScope();
container
  .bind<PlaylistRoutes>(TYPES.PlaylistRoutes)
  .to(PlaylistRoutes)
  .inSingletonScope();
container
  .bind<ExecuteCodeRoutes>(TYPES.ExecuteCodeRoutes)
  .to(ExecuteCodeRoutes)
  .inSingletonScope();
container
  .bind<SubmissionRoutes>(TYPES.SubmissionRoutes)
  .to(SubmissionRoutes)
  .inSingletonScope();
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
container
  .bind<PlaylistRepository>(TYPES.PlaylistRepository)
  .to(PlaylistRepository)
  .inSingletonScope();
container
  .bind<ProblemInPlaylistRepository>(TYPES.ProblemInPlaylistRepository)
  .to(ProblemInPlaylistRepository)
  .inSingletonScope();
container
  .bind<ProblemSolvedRepository>(TYPES.ProblemSolvedRepository)
  .to(ProblemSolvedRepository)
  .inSingletonScope();
container
  .bind<TestCaseResultRepository>(TYPES.TestCaseResultRepository)
  .to(TestCaseResultRepository)
  .inSingletonScope();

container
  .bind<AuthService>(TYPES.AuthService)
  .to(AuthService)
  .inSingletonScope();
container
  .bind<SubmissionService>(TYPES.SubmissionService)
  .to(SubmissionService)
  .inSingletonScope();
container
  .bind<TestCaseResultService>(TYPES.TestCaseResultService)
  .to(TestCaseResultService)
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
  .bind<ProblemInPlaylistService>(TYPES.ProblemInPlaylistService)
  .to(ProblemInPlaylistService)
  .inSingletonScope();
container
  .bind<ExecuteCodeService>(TYPES.ExecuteCodeService)
  .to(ExecuteCodeService)
  .inSingletonScope();
container
  .bind<PlaylistService>(TYPES.PlaylistService)
  .to(PlaylistService)
  .inSingletonScope();
container
  .bind<ProblemSolvedService>(TYPES.ProblemSolvedService)
  .to(ProblemSolvedService)
  .inSingletonScope();

container
  .bind<IAuthStrategy>(TYPES.AuthStrategy)
  .to(AuthStrategy)
  .inSingletonScope();
container
  .bind<ExecuteCodeController>(TYPES.ExecuteCodeController)
  .to(ExecuteCodeController)
  .inSingletonScope();

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
  .bind<PlaylistController>(TYPES.PlaylistController)
  .to(PlaylistController)
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
  .bind<PlaylistValidator>(TYPES.PlaylistValidator)
  .to(PlaylistValidator)
  .inSingletonScope();
container
  .bind<SubmissionValidator>(TYPES.SubmissionValidator)
  .to(SubmissionValidator)
  .inSingletonScope();
container
  .bind<JwtTokenValidator>(TYPES.JwtTokenValidator)
  .to(JwtTokenValidator)
  .inSingletonScope();
container
  .bind<ExecuteCodeValidator>(TYPES.ExecuteCodeValidator)
  .to(ExecuteCodeValidator)
  .inSingletonScope();

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

export {container};
