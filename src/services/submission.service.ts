import { injectable, inject } from 'inversify';
import { TYPES } from '../types';
import { Submission } from '../../prisma/generated/prisma/index';
import { CustomError } from '../utils/errors';
import { CacheManager } from '../utils';
import { SubmissionRepository } from '../repositories';

@injectable()
export class SubmissionService {
  constructor(
    @inject(TYPES.CacheManager) private cacheManager: CacheManager,
    @inject(TYPES.ProblemRepository)
    private problemRepository: SubmissionRepository
  ) {}

  async createSubmission(data: any): Promise<Submission> {
    return this.problemRepository.create(data);
  }

  async getAllSubmissions(id?: string): Promise<Submission[]> {
    const submissions = await this.problemRepository.findAll({
      where: {
        problemId: id,
      },
    });
    if (!submissions) throw new CustomError('No submissions found', 404);
    return submissions;
  }

  async getSubmissionsForProblem(
    id: string,
    problemId: string
  ): Promise<Submission[]> {
    const submissions = await this.problemRepository.findAll({
      where: {
        userId: id,
        problemId: problemId,
      },
    });
    if (!submissions) throw new CustomError('No submissions found', 404);
    return submissions;
  }
  async getCount(problemId: string): Promise<number> {
    const submissions = await this.problemRepository.count({
      where: {
        id: problemId,
      },
    });
    if (!submissions) throw new CustomError('No submissions found', 404);
    return submissions;
  }
}
