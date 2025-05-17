import {injectable, inject} from "inversify";
import {Request, Response} from "express";
import {TYPES} from "../types";
import {IAuthService} from "../interfaces";
import {
  ExecuteCodeService,
  Judge0Service,
  SubmissionService,
  ProblemSolvedService,
  TestCaseResultService,
} from "../services";
import {CustomError} from "../utils/errors";
import {LogDecorator} from "../utils/decorator";
/**
 * Controller class for authentication endpoints
 */
@injectable()
export class ExecuteCodeController {
  constructor(
    @inject(TYPES.ExecuteCodeService)
    private executeCodeService: ExecuteCodeService,
    @inject(TYPES.Judge0Service) private judge0Service: Judge0Service,
    @inject(TYPES.AuthService) private authService: IAuthService,
    @inject(TYPES.SubmissionService)
    private submissionService: SubmissionService,
    @inject(TYPES.ProblemSolvedService)
    private problemSolvedService: ProblemSolvedService,
    @inject(TYPES.TestCaseResultService)
    private testCaseResultService: TestCaseResultService
  ) {}

  @LogDecorator.LogMethod()
  async executeCode(req: Request, res: Response) {
    const {source_code, language_id, stdin, expected_outputs, problemId} =
      req.body;
    const userId: any = req?.user?.id;
    if (!userId) {
      throw new CustomError("User ID is required", 400);
    }

    // 2. Prepare each test cases for judge0 batch submission
    const submissions = stdin.map((input: any) => ({
      source_code,
      language_id,
      stdin: input,
    }));

    // 3. Send batch of submissions to judge0
    const submitResponse = await this.judge0Service.submitBatch(submissions);

    const tokens = submitResponse.map((res: {token: string}) => res.token);

    // 4. Poll judge0 for results of all submitted test cases
    const results = await this.judge0Service.pollBatchResults(tokens);

    console.log("Result-------------");
    console.log(results);

    //  Analyze test case results
    let allPassed = true;
    const detailedResults = results.map((result: any, i: number) => {
      const stdout = result.stdout?.trim();
      const expected_output = expected_outputs[i]?.trim();
      const passed = stdout === expected_output;

      if (!passed) allPassed = false;

      return {
        testCase: i + 1,
        passed,
        stdout,
        expected: expected_output,
        stderr: result.stderr || null,
        compile_output: result.compile_output || null,
        status: result.status.description,
        memory: result.memory ? `${result.memory} KB` : undefined,
        time: result.time ? `${result.time} s` : undefined,
      };
    });

    console.log(detailedResults);

    // store submission summary
    const submission = await this.submissionService.storeSubmission({
      data: {
        userId,
        problemId,
        sourceCode: source_code,
        language: this.judge0Service.getLanguageName(language_id),
        stdin: stdin.join("\n"),
        stdout: JSON.stringify(detailedResults.map((r: any) => r.stdout)),
        stderr: detailedResults.some((r: any) => r.stderr)
          ? JSON.stringify(detailedResults.map((r: any) => r.stderr))
          : null,
        compileOutput: detailedResults.some((r: any) => r.compile_output)
          ? JSON.stringify(detailedResults.map((r: any) => r.compile_output))
          : null,
        status: allPassed ? "ACCEPTED" : "WORNG_ANSWER",
        memory: detailedResults.some((r: any) => r.memory)
          ? JSON.stringify(detailedResults.map((r: any) => r.memory))
          : null,
        time: detailedResults.some((r: any) => r.time)
          ? JSON.stringify(detailedResults.map((r: any) => r.time))
          : null,
      },
    });

    // If All passed = true mark problem as solved for the current user
    if (allPassed) {
      await this.problemSolvedService.upsert({
        where: {
          userId_problemId: {
            userId,
            problemId,
          },
        },
        create: {
          userId,
          problemId,
        },
        update: {},
      });
    }

    // 8. Save individual test case results  using detailedResult
    interface TestCaseResult {
      submissionId: number;
      testCase: number;
      passed: boolean;
      stdout: string | null | undefined;
      expected: string | null | undefined;
      stderr: string | null;
      compileOutput: string | null;
      status: string;
      memory: string | undefined;
      time: string | undefined;
    }

    const testCaseResults: TestCaseResult[] = detailedResults.map(
      (result: {
        testCase: number;
        passed: boolean;
        stdout: string | null | undefined;
        expected: string | null | undefined;
        stderr: string | null;
        compile_output: string | null;
        status: string;
        memory: string | undefined;
        time: string | undefined;
      }) => ({
        submissionId: submission.id,
        testCase: result.testCase,
        passed: result.passed,
        stdout: result.stdout,
        expected: result.expected,
        stderr: result.stderr,
        compileOutput: result.compile_output,
        status: result.status,
        memory: result.memory,
        time: result.time,
      })
    );
    await this.testCaseResultService.createMany(testCaseResults);

    const submissionWithTestCase = await this.submissionService.findUnique({
      where: {
        id: submission.id,
      },
      include: {
        testCases: true,
      },
    });
    //
    res.sendResponse(
      submissionWithTestCase,
      "Code Executed! Successfully!",
      200
    );
  }
}
