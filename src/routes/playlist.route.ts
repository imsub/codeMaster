import { injectable, inject } from 'inversify';
import { Router } from 'express';
import { TYPES } from '../types';
import { CatchAsync } from '../utils/';
import { AuthMiddleware } from '../middlewares/';
import { SubmissionController } from '../controllers';
import { SubmissionValidator , JwtTokenValidator } from '../validators';
import rateLimit from 'express-rate-limit';

@injectable()
export class PlaylistRoutes {
  private playlistRouter: Router;
  private authLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // Limit each IP to 100 requests per windowMs
  });

  constructor(
    @inject(TYPES.AuthMiddleware) private authMiddleware: AuthMiddleware,
    @inject(TYPES.CatchAsync) private catchAsyncHandler: CatchAsync,
    @inject(TYPES.SubmissionController)
    private submissionController: SubmissionController,
    @inject(TYPES.SubmissionValidator) private submissionValidator: SubmissionValidator,
    @inject(TYPES.JwtTokenValidator) private jwtValidator: JwtTokenValidator,
  ) {
    this.playlistRouter = Router();
    this.setupRoutes();
  }

  private setupRoutes() {
   
this.playlistRouter.post(
      '/getAllSubmissions',
      this.authLimiter,
      this.jwtValidator.validateJwtToken,
      this.authMiddleware.authenticate('ACCESS'),
      this.authMiddleware.checkAdminRole,
      this.catchAsyncHandler.handle(
        this.submissionController.getAllSubmissions.bind(this.submissionController)
      )
    );
    this.playlistRouter.post(
      '/getSubmissions/:problemId',
      this.authLimiter,
      this.jwtValidator.validateJwtToken,
      this.authMiddleware.authenticate('ACCESS'),
      this.submissionValidator.validateProblemId,
      this.catchAsyncHandler.handle(
        this.submissionController.getSubmissionsForProblem.bind(this.submissionController)
      )
    );
    this.playlistRouter.post(
      '/getSubmissionsCount/:problemId',
      this.authLimiter,
      this.jwtValidator.validateJwtToken,
      this.authMiddleware.authenticate('ACCESS'),
      this.submissionValidator.validateProblemId,
      this.catchAsyncHandler.handle(
        this.submissionController.getAllTheSubmissionsForProblem.bind(this.submissionController)
      )
    );
  }

  getRouter(): Router {
    return this.playlistRouter;
  }
}
