import {injectable, inject} from "inversify";
import {Router} from "express";
import {TYPES} from "../types/index";
import {AuthController} from "../controllers";
import {CatchAsync} from "../utils";
import {AuthMiddleware} from "../middlewares";
import rateLimit from "express-rate-limit";
import {AuthValidator, JwtTokenValidator} from "../validators";

@injectable()
export class AuthRoutes {
  private authRouter: Router;
  private authLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // Limit each IP to 100 requests per windowMs
  });

  constructor(
    @inject(TYPES.AuthController) private authController: AuthController,
    @inject(TYPES.AuthMiddleware) private authMiddleware: AuthMiddleware,
    @inject(TYPES.CatchAsync) private catchAsyncHandler: CatchAsync,
    @inject(TYPES.AuthValidator) private authValidator: AuthValidator,
    @inject(TYPES.JwtTokenValidator) private jwtValidator: JwtTokenValidator
  ) {
    this.authRouter = Router();
    this.setupRoutes();
  }

  private setupRoutes() {
    this.authRouter.post(
      "/register",
      this.authLimiter,
      this.authValidator.validateRegister,
      this.catchAsyncHandler.handle(
        this.authController.register.bind(this.authController)
      )
    );
    this.authRouter.post(
      "/login",
      this.authLimiter,
      this.authValidator.validateLogin,
      this.catchAsyncHandler.handle(
        this.authController.login.bind(this.authController)
      )
    );
    this.authRouter.get(
      "/logout",
      this.authLimiter,
      this.jwtValidator.validateJwtToken,
      this.authValidator.validateLogout,
      this.authMiddleware.authenticate("ACCESS"),
      this.catchAsyncHandler.handle(
        this.authController.logout.bind(this.authController)
      )
    );

    this.authRouter.get(
      "/refreshToken",
      this.authLimiter,
      this.authValidator.validateRefreshToken,
      this.authMiddleware.authenticate("REFRESH"),
      this.catchAsyncHandler.handle(
        this.authController.refreshToken.bind(this.authController)
      )
    );
    this.authRouter.post(
      "/forgotPassword",
      this.authLimiter,
      this.authValidator.validateForgotPassword,
      this.catchAsyncHandler.handle(
        this.authController.forgotPassword.bind(this.authController)
      )
    );
    this.authRouter.patch(
      "/verifyForgotPassword/:token",
      this.authLimiter,
      this.authValidator.validateResetPassword,
      this.catchAsyncHandler.handle(
        this.authController.verifyForgotPassword.bind(this.authController)
      )
    );
    this.authRouter.post(
      "/verifyEmail/:token",
      this.authLimiter,
      this.authValidator.validateVerifyEmail,
      this.catchAsyncHandler.handle(
        this.authController.verifyTemporaryToken.bind(this.authController)
      )
    );
    this.authRouter.get(
      "/resendEmailVerification",
      this.authLimiter,
      this.jwtValidator.validateJwtToken,
      this.authValidator.validateResendEmailVerification,
      this.authMiddleware.authenticate("ACCESS"),
      this.catchAsyncHandler.handle(
        this.authController.resendEmailVerification.bind(this.authController)
      )
    );
    this.authRouter.patch(
      "/changeCurrentPassword",
      this.authLimiter,
      this.jwtValidator.validateJwtToken,
      this.authValidator.validateChangeCurrentPassword,
      this.authMiddleware.authenticate("ACCESS"),
      this.catchAsyncHandler.handle(
        this.authController.changeCurrentPassword.bind(this.authController)
      )
    );
    this.authRouter.get(
      "/profile",
      this.authLimiter,
      this.jwtValidator.validateJwtToken,
      this.authMiddleware.authenticate("ACCESS"),
      this.catchAsyncHandler.handle(
        this.authController.getProfile.bind(this.authController)
      )
    );
    this.authRouter.get(
      "/check",
      this.authLimiter,
      this.jwtValidator.validateJwtToken,
      this.authMiddleware.authenticate("ACCESS"),
      this.catchAsyncHandler.handle(
        this.authController.check.bind(this.authController)
      )
    );
  }

  getRouter(): Router {
    return this.authRouter;
  }
}
