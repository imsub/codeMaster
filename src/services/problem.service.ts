import { injectable, inject } from 'inversify';
import { TYPES } from '../types';
import { Problem , PrismaClient } from '../../prisma/generated/prisma/index';
import { CustomError } from '../utils/errors';
import { CacheManager } from '../utils';
import { ProblemRepository } from '../repositories';

@injectable()
export class ProblemService {
  constructor(
    @inject(TYPES.CacheManager) private cacheManager: CacheManager,
    @inject(TYPES.ProblemRepository) private problemRepository: ProblemRepository,
    @inject(TYPES.PrismaClient) private prisma: PrismaClient
  ) {}


  async createProblem(data :any): Promise<Problem> {
    return this.problemRepository.create(data);
  }

  async getProblemById(id: string): Promise<Problem | null> {
    const cached = await this.cacheManager.getCache(`problem:${id}`);
    if (cached) return JSON.parse(cached);
    const problem = await this.problemRepository.findById(id);
    if (!problem) throw new CustomError('Problem not found', 404);
    await this.cacheManager.setCache(
      `problem:${id}`,
      JSON.stringify(problem),
      3600
    );
    return problem;
  }
}
