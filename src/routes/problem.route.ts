import { injectable, inject } from 'inversify';
import { Router } from 'express';
import { TYPES } from '../types';
import { CatchAsync } from '../utils/';
import { AuthMiddleware } from '../middlewares/';
import { ProblemController } from '../controllers';
import { ProblemValidator } from '../validators';

@injectable()
export class ProblemRoutes {
  private problemRouter: Router;

  constructor(
    @inject(TYPES.ProblemController) private problemController: ProblemController,
    @inject(TYPES.AuthMiddleware) private authMiddleware: AuthMiddleware,
    @inject(TYPES.CatchAsync) private asyncHandler: CatchAsync,
    @inject(TYPES.ProblemValidator) private problemValidator: ProblemValidator,
  ) {
    this.problemRouter = Router();
    this.setupRoutes();
  }

  private setupRoutes() {
    this.problemRouter.post(
      '/create-problem',
      this.problemValidator.validateProblemInput,
      this.authMiddleware.authenticate("ACCESS"),
      this.authMiddleware.checkAdmin,
      this.asyncHandler.handle(
        this.problemController.createProblem.bind(this.problemController)
      )
    );

  }

  getRouter(): Router {
    return this.problemRouter;
  }
}
