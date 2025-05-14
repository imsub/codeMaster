// import { injectable, inject } from 'inversify';
// import { TYPES } from '../types';
// import { BaseRepository } from './base.repository';
// import { IProblemRepository } from '../interfaces/IProblemRepository';
// import { Problem, PrismaClient } from '@prisma/client';
// import { CustomError } from '../utils/errors';

// /**
//  * Repository for Problem model operations
//  */
// @injectable()
// export class ProblemRepository
//   extends BaseRepository<Problem>
//   implements IProblemRepository
// {
//   constructor(@inject(TYPES.PrismaClient) prisma: PrismaClient) {
//     super(prisma, 'problem');
//   }

//   async create(data: {
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
//     try {
//       return await this.prisma.problem.create({ data });
//     } catch (error) {
//       throw new CustomError('Failed to create problem', 500, error);
//     }
//   }

//   async findById(id: string): Promise<Problem | null> {
//     try {
//       return await this.prisma.problem.findUnique({
//         where: { id },
//         select: { id: true, title: true, description: true, difficulty: true },
//       });
//     } catch (error) {
//       throw new CustomError('Failed to find problem', 500, error);
//     }
//   }
// }
