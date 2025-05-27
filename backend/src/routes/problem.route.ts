import {injectable, inject} from "inversify";
import {Router} from "express";
import {TYPES} from "../types";
import {CatchAsync} from "../utils/";
import {AuthMiddleware} from "../middlewares/";
import {ProblemController} from "../controllers";
import {ProblemValidator, JwtTokenValidator} from "../validators";
import rateLimit from "express-rate-limit";

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
    @inject(TYPES.ProblemValidator) private problemValidator: ProblemValidator,
    @inject(TYPES.JwtTokenValidator) private jwtValidator: JwtTokenValidator
  ) {
    this.problemRouter = Router();
    this.setupRoutes();
  }

  private setupRoutes() {
    this.problemRouter.post(
      "/createProblem",
      this.authLimiter,
      this.jwtValidator.validateJwtToken,
      this.problemValidator.validateProblemInput,
      this.authMiddleware.authenticate("ACCESS"),
      this.authMiddleware.checkAdminRole,
      this.catchAsyncHandler.handle(
        this.problemController.createProblem.bind(this.problemController)
      )
    );
    this.problemRouter.get(
      "/getAllProblems",
      this.authLimiter,
      this.jwtValidator.validateJwtToken,
      this.authMiddleware.authenticate("ACCESS"),
      this.catchAsyncHandler.handle(
        this.problemController.getAllProblems.bind(this.problemController)
      )
    );
    this.problemRouter.get(
      "/getProblemById/:id",
      this.authLimiter,
      this.jwtValidator.validateJwtToken,
      this.problemValidator.validateProblemId,
      this.authMiddleware.authenticate("ACCESS"),
      this.catchAsyncHandler.handle(
        this.problemController.getProblemById.bind(this.problemController)
      )
    );
    this.problemRouter.put(
      "/updateProblem/:id",
      this.authLimiter,
      this.jwtValidator.validateJwtToken,
      this.problemValidator.validateProblemId,
      this.problemValidator.validateProblemInput,
      this.authMiddleware.authenticate("ACCESS"),
      this.authMiddleware.checkAdminRole,
      this.catchAsyncHandler.handle(
        this.problemController.updateProblem.bind(this.problemController)
      )
    );
    this.problemRouter.delete(
      "/deleteProblem/:id",
      this.authLimiter,
      this.jwtValidator.validateJwtToken,
      this.problemValidator.validateProblemId,
      this.authMiddleware.authenticate("ACCESS"),
      this.authMiddleware.checkAdminRole,
      this.catchAsyncHandler.handle(
        this.problemController.deleteProblem.bind(this.problemController)
      )
    );
    this.problemRouter.get(
      "/getSolvedProblems",
      this.authLimiter,
      this.jwtValidator.validateJwtToken,
      this.authMiddleware.authenticate("ACCESS"),
      this.catchAsyncHandler.handle(
        this.problemController.getAllProblemsSolvedByUser.bind(
          this.problemController
        )
      )
    );
  }

  getRouter(): Router {
    return this.problemRouter;
  }
}
