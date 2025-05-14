// import { injectable, inject } from 'inversify';
// import { Request, Response } from 'express';
// import { TYPES } from '../types';
// import { IProblemService } from '../interfaces';
// import { ProblemValidator } from '../validators/problem.validator';
// import { CustomError } from '../utils/errors';
// import { LogDecorator } from '../utils/decorators';

// /**
//  * Controller class for problem endpoints
//  */
// @injectable()
// export class ProblemController {
//   constructor(
//     @inject(TYPES.ProblemService) private problemService: IProblemService,
//     @inject(TYPES.ProblemValidator) private problemValidator: ProblemValidator
//   ) {}

//   @LogDecorator.LogMethod()
//   async createProblem(req: Request, res: Response) {
//     const data = this.problemValidator.validateProblemInput(req.body);
//     const problem = await this.problemService.createProblem({
//       ...data,
//       userId: req.user.id,
//     });
//     res.status(201).json(problem);
//   }

//   @LogDecorator.LogMethod()
//   async getProblem(req: Request, res: Response) {
//     const problem = await this.problemService.getProblemById(req.params.id);
//     res.json(problem);
//   }
// }
