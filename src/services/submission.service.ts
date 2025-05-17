import {injectable, inject} from "inversify";
import {TYPES} from "../types";
import {Submission, Prisma} from "../../prisma/generated/prisma/index";
import {CustomError} from "../utils/errors";
import {CacheManager} from "../utils";
import {SubmissionRepository} from "../repositories";

@injectable()
export class SubmissionService {
  constructor(
    @inject(TYPES.CacheManager) private cacheManager: CacheManager,
    @inject(TYPES.SubmissionRepository)
    private submissionRepository: SubmissionRepository
  ) {}

  async createSubmission(data: any): Promise<Submission> {
    return this.submissionRepository.create(data);
  }

  async getAllSubmissions(id?: string): Promise<Submission[]> {
    const submissions = await this.submissionRepository.findAll({
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
  ): Promise<Submission[]> {
    const submissions = await this.submissionRepository.findAll({
      where: {
        userId: id,
        problemId: problemId,
      },
    });
    if (!submissions) throw new CustomError("No submissions found", 404);
    return submissions;
  }
  async getCount(problemId: string): Promise<number> {
    const submissions = await this.submissionRepository.count({
      where: {
        id: problemId,
      },
    });
    if (!submissions) throw new CustomError("No submissions found", 404);
    return submissions;
  }
  async storeSubmission(payload: any): Promise<Submission> {
    return this.submissionRepository.create(payload);
  }
  async findUnique(query: {where: any; include: any}): Promise<Submission> {
    const submission = await this.submissionRepository.findById(query.where, {
      include: query.include,
    });
    if (!submission) {
      throw new CustomError("Submission not found", 404);
    }
    return submission;
  }
}
