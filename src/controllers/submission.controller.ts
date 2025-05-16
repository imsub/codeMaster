import { injectable, inject } from 'inversify';
import { Request, Response } from 'express';
import { TYPES } from '../types';
import { CustomError } from '../utils/errors';
import { LogDecorator } from '../utils';
import { SubmissionService, Judge0Service } from '../services';
/**
 * Controller class for problem endpoints
 */
@injectable()
export class SubmissionController {
  constructor(
    @inject(TYPES.SubmissionService)
    private submissionService: SubmissionService,
    @inject(TYPES.Judge0Service) private judge0Service: Judge0Service
  ) {}

  @LogDecorator.LogMethod()
  async getAllSubmissions(req: Request, res: Response) {
    const submissions = await this.submissionService.getAllSubmissions(
      req?.user?.id ? String(req.user.id) : undefined
    );
    if (!submissions) throw new CustomError('No submissions found', 404);

    (res as Response).sendResponse(submissions, 'Submissions fetched successfully.', 200);
  }

  @LogDecorator.LogMethod()
  async getSubmissionsForProblem(req: Request, res: Response) {
    const { problemId } = req.params;
    const submissions =
      await this.submissionService.getSubmissionsForProblem(String(req?.user?.id),problemId);
    if (!submissions) throw new CustomError('No submissions found', 404);

    (res as Response).sendResponse(
      submissions,
      'All Submissions found for given problem ID.',
      200
    );
  }

  @LogDecorator.LogMethod()
  async getAllTheSubmissionsForProblem(req: Request, res: Response) {
    const { problemId } = req.params;
    const submissions =
      await this.submissionService.getCount(problemId);
    if (!submissions) throw new CustomError('No submissions found', 404);
    (res as Response).sendResponse(
      submissions,
      'All Submissions found for given problem ID.',
      200
    );
  }
}
