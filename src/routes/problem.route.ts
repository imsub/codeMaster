import { injectable, inject } from 'inversify';
import { Router } from 'express';
import { TYPES } from '../types';
import { CatchAsync } from '../utils/';
import { AuthMiddleware } from '../middlewares/';
import { ProblemController } from '../controllers';
import { ProblemValidator } from '../validators';
import rateLimit from 'express-rate-limit';

@injectable()
export class ProblemRoutes {
  private problemRouter: Router;
  private authLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // Limit each IP to 100 requests per windowMs
  });

  constructor(
    @inject(TYPES.AuthMiddleware) private authMiddleware: AuthMiddleware,
    @inject(TYPES.CatchAsync) private catchAsyncHandler: CatchAsync,
    @inject(TYPES.ProblemController)
    private problemController: ProblemController,
    @inject(TYPES.ProblemValidator) private problemValidator: ProblemValidator
  ) {
    this.problemRouter = Router();
    this.setupRoutes();
  }

  private setupRoutes() {
    this.problemRouter.post(
      '/createProblem',
      this.authLimiter,
      this.problemValidator.validateProblemInput,
      this.authMiddleware.authenticate('ACCESS'),
      this.catchAsyncHandler.handle(
        this.problemController.createProblem.bind(this.problemController)
      )
    );
  }

  getRouter(): Router {
    return this.problemRouter;
  }
}
