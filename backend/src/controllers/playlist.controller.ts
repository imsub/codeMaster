import {injectable, inject} from "inversify";
import {Request, Response} from "express";
import {TYPES} from "../types";
import {IAuthService} from "../interfaces";
import {
  ExecuteCodeService,
  Judge0Service,
  SubmissionService,
  ProblemSolvedService,
  TestCaseResultService,
  PlaylistService,
} from "../services";
import {CustomError} from "../utils/errors";
import {LogDecorator} from "../utils/decorator";
/**
 * Controller class for authentication endpoints
 */
@injectable()
export class PlaylistController {
  constructor(
    @inject(TYPES.PlaylistService)
    private playlistService: PlaylistService,
    @inject(TYPES.Judge0Service) private judge0Service: Judge0Service,
    @inject(TYPES.AuthService) private authService: IAuthService,
    @inject(TYPES.SubmissionService)
    private submissionService: SubmissionService,
    @inject(TYPES.ProblemSolvedService)
    private problemSolvedService: ProblemSolvedService,
    @inject(TYPES.TestCaseResultService)
    private testCaseResultService: TestCaseResultService
  ) {}

  @LogDecorator.LogMethod()
  async getPlayAllListDetails(req: Request, res: Response) {
    const playlist = await this.playlistService.getAllPlaylistsDetails(
      `${req?.user?.id}`
    );

    res.sendResponse({playlist}, "Fetched all playlists successfully!", 200);
  }
  @LogDecorator.LogMethod()
  async getPlayListDetails(req: Request, res: Response) {
    const {playlistId} = req.params;
    const playlist = await this.playlistService.getPlaylistDetails(
      playlistId,
      `${req?.user?.id}`
    );
    res.sendResponse({playlist}, "Fetched playlist details successfully!", 200);
  }
  @LogDecorator.LogMethod()
  async createPlaylist(req: Request, res: Response) {
    const {name, description} = req.body;
    const userId = `${req?.user?.id}`;
    const playlist = await this.playlistService.createPlaylist(
      name,
      description,
      userId
    );
    res.sendResponse({playlist}, "Playlist created successfully!", 201);
  }
  @LogDecorator.LogMethod()
  async addProblemToPlaylist(req: Request, res: Response) {
    const {playlistId} = req.params;
    const {problemIds} = req.body; // Accepts an array of problem IDs
    const problemsInPlaylist = await this.playlistService.addProblemsToPlaylist(
      playlistId,
      problemIds
    );
    res.sendResponse(
      {problemsInPlaylist},
      "Problems added to playlist successfully!",
      200
    );
  }
  @LogDecorator.LogMethod()
  async deletePlaylist(req: Request, res: Response) {
    const {playlistId} = req.params;
    await this.playlistService.deletePlaylist(playlistId, `${req?.user?.id}`);
    res.sendResponse({}, "Playlist deleted successfully!", 200);
  }
  @LogDecorator.LogMethod()
  async removeProblemFromPlaylist(req: Request, res: Response) {
    const {playlistId} = req.params;
    const {problemIds} = req.body;
    const deletedProblems =
      await this.playlistService.removeProblemFromPlaylist(
        playlistId,
        problemIds
      );
    res.sendResponse(
      deletedProblems,
      "Problem removed from playlist successfully!",
      200
    );
  }
}
