import {injectable, inject} from "inversify";
import {TYPES} from "../types";
import {ProblemSolved, Prisma} from "../../prisma/generated/prisma/index";
import {CustomError} from "../utils/errors";
import {CacheManager} from "../utils";
import {ProblemSolvedRepository} from "../repositories";

@injectable()
export class ProblemSolvedService {
  constructor(
    @inject(TYPES.CacheManager) private cacheManager: CacheManager,
    @inject(TYPES.ProblemSolvedRepository)
    private problemSolvedRepository: ProblemSolvedRepository
  ) {}

  async createSubmission(data: any): Promise<ProblemSolved> {
    return this.problemSolvedRepository.create(data);
  }

  async getAllSubmissions(id?: string): Promise<ProblemSolved[]> {
    const submissions = await this.problemSolvedRepository.findAll({
      where: {
        problemId: id,
      },
    });
    if (!submissions) throw new CustomError("No submissions found", 404);
    return submissions;
  }

  async getSubmissionsForProblem(
    id: string,
    problemId: string
  ): Promise<ProblemSolved[]> {
    const submissions = await this.problemSolvedRepository.findAll({
      where: {
        userId: id,
        problemId: problemId,
      },
    });
    if (!submissions) throw new CustomError("No submissions found", 404);
    return submissions;
  }
  async getCount(problemId: string): Promise<number> {
    const submissions = await this.problemSolvedRepository.count({
      where: {
        id: problemId,
      },
    });
    if (!submissions) throw new CustomError("No submissions found", 404);
    return submissions;
  }
  async storeSubmission(payload: any): Promise<ProblemSolved> {
    return this.problemSolvedRepository.create(payload);
  }
}
