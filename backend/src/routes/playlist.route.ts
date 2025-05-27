import {injectable, inject} from "inversify";
import {Router} from "express";
import {TYPES} from "../types";
import {CatchAsync} from "../utils/";
import {AuthMiddleware} from "../middlewares/";
import {PlaylistController} from "../controllers";
import {PlaylistValidator, JwtTokenValidator} from "../validators";
import rateLimit from "express-rate-limit";

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
    @inject(TYPES.PlaylistController)
    private playlistController: PlaylistController,
    @inject(TYPES.PlaylistValidator)
    private playlistValidator: PlaylistValidator,
    @inject(TYPES.JwtTokenValidator) private jwtValidator: JwtTokenValidator
  ) {
    this.playlistRouter = Router();
    this.setupRoutes();
  }

  private setupRoutes() {
    this.playlistRouter.get(
      "/",
      this.authLimiter,
      this.jwtValidator.validateJwtToken,
      this.authMiddleware.authenticate("ACCESS"),
      this.authMiddleware.checkAdminRole,
      this.catchAsyncHandler.handle(
        this.playlistController.getPlayAllListDetails.bind(
          this.playlistController
        )
      )
    );
    this.playlistRouter.get(
      "/:playlistId",
      this.authLimiter,
      this.jwtValidator.validateJwtToken,
      this.authMiddleware.authenticate("ACCESS"),
      this.playlistValidator.validatePlaylistId,
      this.catchAsyncHandler.handle(
        this.playlistController.getPlayListDetails.bind(this.playlistController)
      )
    );
    this.playlistRouter.post(
      "/create-playlist",
      this.authLimiter,
      this.jwtValidator.validateJwtToken,
      this.authMiddleware.authenticate("ACCESS"),
      this.playlistValidator.validateCreatePlaylist,
      this.catchAsyncHandler.handle(
        this.playlistController.createPlaylist.bind(this.playlistController)
      )
    );
    this.playlistRouter.post(
      "/:playlistId/add-problem",
      this.authLimiter,
      this.jwtValidator.validateJwtToken,
      this.authMiddleware.authenticate("ACCESS"),
      this.playlistValidator.validateAddProblemToPlaylist,
      this.catchAsyncHandler.handle(
        this.playlistController.addProblemToPlaylist.bind(
          this.playlistController
        )
      )
    );
    this.playlistRouter.delete(
      "/:playlistId",
      this.authLimiter,
      this.jwtValidator.validateJwtToken,
      this.authMiddleware.authenticate("ACCESS"),
      this.playlistValidator.validatePlaylistId,
      this.catchAsyncHandler.handle(
        this.playlistController.deletePlaylist.bind(this.playlistController)
      )
    );
    this.playlistRouter.delete(
      "/:playlistId/remove-problem",
      this.authLimiter,
      this.jwtValidator.validateJwtToken,
      this.authMiddleware.authenticate("ACCESS"),
      this.playlistValidator.validateAddProblemToPlaylist,
      this.catchAsyncHandler.handle(
        this.playlistController.removeProblemFromPlaylist.bind(
          this.playlistController
        )
      )
    );

    // this.playlistRouter.get(
    //   "/:playlistId/get-playlist-problems",
    //   this.authLimiter,
    //   this.jwtValidator.validateJwtToken,
    //   this.authMiddleware.authenticate("ACCESS"),
    //   this.catchAsyncHandler.handle(
    //     this.playlistController.getPlaylistProblems.bind(this.playlistController)
    //   )
    // );
  }

  getRouter(): Router {
    return this.playlistRouter;
  }
}
