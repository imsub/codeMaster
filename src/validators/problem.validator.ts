// import { injectable } from 'inversify';
// import { z } from 'zod';
// import { CustomError } from '../utils/errors';

// const problemSchema = z.object({
//   title: z.string(),
//   description: z.string(),
//   difficulty: z.string(),
//   tags: z.array(z.string()),
//   examples: z.any(),
//   constraints: z.string(),
//   hints: z.string().optional(),
//   editorial: z.string().optional(),
//   testCases: z.any(),
//   codeSnippets: z.any(),
//   referenceSolutions: z.any(),
// });

// /**
//  * Validator class for problem input
//  */
// @injectable()
// export class ProblemValidator {
//   validateProblemInput(data: any): {
//     title: string;
//     description: string;
//     difficulty: string;
//     tags: string[];
//     examples: any;
//     constraints: string;
//     hints?: string;
//     editorial?: string;
//     testCases: any;
//     codeSnippets: any;
//     referenceSolutions: any;
//   } {
//     try {
//       return problemSchema.parse(data);
//     } catch (error) {
//       throw new CustomError('Invalid problem input', 400, error);
//     }
//   }
// }
