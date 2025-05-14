// import { injectable, inject } from 'inversify';
// import { TYPES } from '../types';
// import { IProblemService, IProblemRepository } from '../interfaces';
// import { Problem } from '../../prisma/generated/prisma/index';
// import { CustomError } from '../utils/errors';
// import { LogDecorator } from '../utils';
// import { CacheManager } from '../utils';

// /**
//  * Service class for handling problem-related business logic
//  */
// @injectable()
// export class ProblemService implements IProblemService {
//   constructor(
//     @inject(TYPES.ProblemRepository)
//     private problemRepository: IProblemRepository,
//     @inject(TYPES.CacheManager) private cacheManager: CacheManager
//   ) {}

//   @LogDecorator.LogMethod()
//   async createProblem(data: {
//     title: string;
//     description: string;
//     difficulty: string;
//     tags: string[];
//     userId: string;
//     examples: any;
//     constraints: string;
//     hints?: string;
//     editorial?: string;
//     testCases: any;
//     codeSnippets: any;
//     referenceSolutions: any;
//   }): Promise<Problem> {
//     return this.problemRepository.create(data);
//   }

//   @LogDecorator.LogMethod()
//   async getProblemById(id: string): Promise<Problem | null> {
//     const cached = await this.cacheManager.getCache(`problem:${id}`);
//     if (cached) return JSON.parse(cached);
//     const problem = await this.problemRepository.findById(id);
//     if (!problem) throw new CustomError('Problem not found', 404);
//     await this.cacheManager.setCache(
//       `problem:${id}`,
//       JSON.stringify(problem),
//       3600
//     );
//     return problem;
//   }
// }
