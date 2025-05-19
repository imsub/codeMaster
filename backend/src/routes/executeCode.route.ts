import {injectable, inject} from "inversify";
import {Router} from "express";
import {TYPES} from "../types";
import {CatchAsync} from "../utils/";
import {AuthMiddleware} from "../middlewares/";
import {ExecuteCodeController} from "../controllers";
import {ExecuteCodeValidator, JwtTokenValidator} from "../validators";
import rateLimit from "express-rate-limit";

@injectable()
export class ExecuteCodeRoutes {
  private executeCodeRouter: Router;
  private authLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // Limit each IP to 100 requests per windowMs
  });

  constructor(
    @inject(TYPES.AuthMiddleware) private authMiddleware: AuthMiddleware,
    @inject(TYPES.CatchAsync) private catchAsyncHandler: CatchAsync,
    @inject(TYPES.ExecuteCodeController)
    private executeCodeController: ExecuteCodeController,
    @inject(TYPES.ExecuteCodeValidator)
    private executeCodeValidator: ExecuteCodeValidator,
    @inject(TYPES.JwtTokenValidator) private jwtValidator: JwtTokenValidator
  ) {
    this.executeCodeRouter = Router();
    this.setupRoutes();
  }

  private setupRoutes() {
    this.executeCodeRouter.post(
      "/run",
      this.authLimiter,
      this.jwtValidator.validateJwtToken,
      this.executeCodeValidator.validateExecuteCode,
      this.authMiddleware.authenticate("ACCESS"),
      this.catchAsyncHandler.handle(
        this.executeCodeController.executeCode.bind(this.executeCodeController)
      )
    );
  }

  getRouter(): Router {
    return this.executeCodeRouter;
  }
}
