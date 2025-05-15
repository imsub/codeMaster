import { injectable, inject } from 'inversify';
import { Request, Response } from 'express';
import { TYPES } from '../types';
import { IProblemService } from '../interfaces';
import { ProblemValidator } from '../validators';
import { CustomError } from '../utils/errors';
import { LogDecorator } from '../utils';
import { ProblemService , Judge0Service } from '../services';
/**
 * Controller class for problem endpoints
 */
@injectable()
export class ProblemController {
  constructor(
    @inject(TYPES.ProblemService) private problemService: ProblemService,
    @inject(TYPES.ProblemValidator) private problemValidator: ProblemValidator,
    @inject(TYPES.Judge0Service) private judge0Service: Judge0Service,
  ) {}

  @LogDecorator.LogMethod()
  async createProblem(req: Request, res: Response) {
    const {
    title,
    description,
    difficulty,
    tags,
    examples,
    constraints,
    testcases,
    codeSnippets,
    referenceSolutions,
  } = req.body;
    for (const [language, solutionCode] of Object.entries(referenceSolutions)) {
      const languageId = this.judge0Service.getJudge0LanguageId(language);

      if (!languageId) {
        return res
          .status(400)
          .json({ error: `Language ${language} is not supported` });
      }

      //
      const submissions = testcases.map(({ input, output }) => ({
        source_code: solutionCode,
        language_id: languageId,
        stdin: input,
        expected_output: output,
      }));

      const submissionResults = await this.judge0Service.submitBatch(submissions);

      const tokens = submissionResults.map((res) => res.token);

      const results = await this.judge0Service.pollBatchResults(tokens);

      for (let i = 0; i < results.length; i++) {
        const result = results[i];
        console.log("Result-----", result);
        // console.log(
        //   `Testcase ${i + 1} and Language ${language} ----- result ${JSON.stringify(result.status.description)}`
        // );
        if (result.status.id !== 3) {
          return res.status(400).json({
            error: `Testcase ${i + 1} failed for language ${language}`,
          });
        }
      }
    }

    const newProblem = await this.problemService.createProblem({
      data: {
        title,
        description,
        difficulty,
        tags,
        examples,
        constraints,
        testcases,
        codeSnippets,
        referenceSolutions,
        userId: req?.user?.id,
      },
    });
    (res as any).sendResponse(
        newProblem,
        'Problem Created Successfully',
        201
      );
  }

  @LogDecorator.LogMethod()
  async getProblem(req: Request, res: Response) {
    const problem = await this.problemService.getProblemById(req.params.id);
    res.json(problem);
  }
}
