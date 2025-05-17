import {injectable, inject} from "inversify";
import {Request, Response} from "express";
import {TYPES} from "../types";
import {CustomError} from "../utils/errors";
import {LogDecorator} from "../utils";
import {ProblemService, Judge0Service} from "../services";
/**
 * Controller class for problem endpoints
 */
@injectable()
export class ProblemController {
  constructor(
    @inject(TYPES.ProblemService) private problemService: ProblemService,
    @inject(TYPES.Judge0Service) private judge0Service: Judge0Service
  ) {}

  @LogDecorator.LogMethod()
  async createProblem(req: Request, res: Response) {
    const {
      title,
      testCases,
      tags,
      referenceSolution,
      examples,
      difficulty,
      description,
      constraints,
      codeSnippet,
    } = req.body;
    for (const [language, solutionCode] of Object.entries(referenceSolution)) {
      const languageId = this.judge0Service.getJudge0LanguageId(language);

      if (!languageId) {
        throw new CustomError(`Language ${language} is not supported`, 400);
      }
      const submissions = testCases.map(({input, output}) => ({
        source_code: solutionCode,
        language_id: languageId,
        stdin: input,
        expected_output: output,
      }));

      const submissionResults =
        await this.judge0Service.submitBatch(submissions);

      const tokens = submissionResults.map((res: any) => res.token);

      const results = await this.judge0Service.pollBatchResults(tokens);

      for (let i = 0; i < results.length; i++) {
        const result = results[i];
        console.log("Result-----", result);
        if (result.status.id !== 3) {
          throw new CustomError(
            `Testcase ${i + 1} failed for language ${language}`,
            400
          );
        }
      }
    }

    const newProblem = await this.problemService.createProblem({
      title,
      description,
      difficulty,
      tags,
      examples,
      constraints,
      testCases,
      codeSnippet,
      referenceSolution,
      userId: req?.user?.id,
    });
    (res as Response).sendResponse(
      newProblem,
      "Problem Created Successfully",
      201
    );
  }

  @LogDecorator.LogMethod()
  async getAllProblems(req: Request, res: Response) {
    const problems = await this.problemService.getAllProblems(
      req?.user?.id ? String(req.user.id) : undefined
    );
    (res as Response).sendResponse(problems, "Problems Found.", 200);
  }

  @LogDecorator.LogMethod()
  async getProblemById(req: Request, res: Response) {
    const problem = await this.problemService.getProblemById(req.params.id);
    if (!problem) {
      throw new CustomError("Problem not found", 404);
    }
    (res as Response).sendResponse(problem, "Found Record.", 200);
  }

  @LogDecorator.LogMethod()
  async updateProblem(req: Request, res: Response) {
    const {
      title,
      testCases,
      tags,
      referenceSolution,
      examples,
      difficulty,
      description,
      constraints,
      codeSnippet,
    } = req.body;
    const {id} = req.params;
    const problem = await this.problemService.getProblemById(id);
    if (!problem) {
      throw new CustomError("Problem not found", 404);
    }
    // if (problem.userId !== req?.user?.id) {
    //   throw new CustomError('You are not authorized to update this problem', 403);
    // }
    for (const [language, solutionCode] of Object.entries(referenceSolution)) {
      const languageId = this.judge0Service.getJudge0LanguageId(language);
      if (!languageId) {
        throw new CustomError(`Language ${language} is not supported`, 400);
      }
      const submissions = testCases.map(({input, output}) => ({
        source_code: solutionCode,
        language_id: languageId,
        stdin: input,
        expected_output: output,
      }));
      const submissionResults =
        await this.judge0Service.submitBatch(submissions);
      const tokens = submissionResults.map((res: any) => res.token);
      const results = await this.judge0Service.pollBatchResults(tokens);
      for (let i = 0; i < results.length; i++) {
        const result = results[i];
        console.log("Result-----", result);
        if (result.status.id !== 3) {
          throw new CustomError(
            `Testcase ${i + 1} failed for language ${language}`,
            400
          );
        }
      }
    }
    const updatedProblem = await this.problemService.updateProblem(id, {
      title,
      description,
      difficulty,
      tags,
      examples,
      constraints,
      testCases,
      codeSnippet,
      referenceSolution,
      userId: req?.user?.id,
    });
    if (!updatedProblem) {
      throw new CustomError("Problem not found", 404);
    }
    (res as Response).sendResponse(
      updatedProblem,
      "Problem Updated Successfully",
      200
    );
  }
  @LogDecorator.LogMethod()
  async deleteProblem(req: Request, res: Response) {
    const {id} = req.params;
    const problem = await this.problemService.getProblemById(id);
    if (!problem) {
      throw new CustomError("Problem not found", 404);
    }
    // if (problem.userId !== req?.user?.id) {
    //   throw new CustomError('You are not authorized to delete this problem', 403);
    // }
    await this.problemService.deleteProblem(id);
    (res as Response).sendResponse(null, "Problem Deleted Successfully", 200);
  }

  @LogDecorator.LogMethod()
  async getAllProblemsByUserId(req: Request, res: Response) {
    const {id} = req.params;
    const problems = await this.problemService.getAllProblems(id);
    if (!problems) {
      throw new CustomError("No problems found for this user", 404);
    }
    (res as Response).sendResponse(problems, "Problems Found.", 200);
  }

  @LogDecorator.LogMethod()
  async getAllProblemsSolvedByUser(req: Request, res: Response) {
    const problems = await this.problemService.getAllProblems(
      req?.user?.id ? String(req.user.id) : undefined
    );
    if (!problems) {
      throw new CustomError("No problems found for this user", 404);
    }
    (res as Response).sendResponse(problems, "Problems Found.", 200);
  }

  @LogDecorator.LogMethod()
  async getProblem(req: Request, res: Response) {
    const problem = await this.problemService.getProblemById(req.params.id);
    res.json(problem);
  }
}
