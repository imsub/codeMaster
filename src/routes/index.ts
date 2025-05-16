import express from 'express';
import { AuthRoutes } from './auth.route';
import { ProblemRoutes } from './problem.route';
import { SubmissionRoutes } from './submission.route';
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
  ) {
    this.router = express.Router();
    this.setupRoutes();
  }

  private setupRoutes(): void {
    this.router.use('/auth', this.authRoute.getRouter());
    this.router.use('/problems', this.problemRoutes.getRouter());
    this.router.use('/submission', this.submissionRoutes.getRouter());
    // this.router.use('/execute-code', authRoute);
    // this.router.use('/health-check', authRoute);
  }

  getRouter(): RouterType {
    return this.router;
  }
}
