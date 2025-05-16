import express from 'express';
import { AuthRoutes } from './auth.route';
import { ProblemRoutes } from './problem.route';
import { SubmissionRoutes } from './submission.route';
import { ExecuteCodeRoutes } from './executeCode.route';
import { PlaylistRoutes } from './playlist.route';
import type { Router as RouterType } from 'express';
import { injectable, inject } from 'inversify';
import { TYPES } from '../types/index';

@injectable()
export class Router {
  private router: RouterType;
  constructor(
    @inject(TYPES.AuthRoutes) private authRoute: AuthRoutes,
    @inject(TYPES.ProblemRoutes) private problemRoutes: ProblemRoutes,
    @inject(TYPES.SubmissionRoutes) private submissionRoutes: SubmissionRoutes,
    @inject(TYPES.ExecuteCodeRoutes) private executeCodeRoutes: ExecuteCodeRoutes,
    @inject(TYPES.PlaylistRoutes) private playlistRoutes: PlaylistRoutes,
  ) {
    this.router = express.Router();
    this.setupRoutes();
  }

  private setupRoutes(): void {
    this.router.use('/auth', this.authRoute.getRouter());
    this.router.use('/problems', this.problemRoutes.getRouter());
    this.router.use('/submission', this.submissionRoutes.getRouter());
    this.router.use('/executeCode', this.executeCodeRoutes.getRouter());
    this.router.use('/playlist', this.playlistRoutes.getRouter());
    this.router.use('/health-check', (req, res) => {
      res.status(200).json({ message: 'OK' });
    });
  }

  getRouter(): RouterType {
    return this.router;
  }
}
