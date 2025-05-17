import {injectable, inject} from "inversify";
import {TYPES} from "../types";
import {ProblemSolved, Prisma} from "../../prisma/generated/prisma/index";
import {CustomError} from "../utils/errors";
import {CacheManager} from "../utils";
import {
  ProblemSolvedRepository,
  TestCaseResultRepository,
} from "../repositories";

@injectable()
export class TestCaseResultService {
  constructor(
    @inject(TYPES.CacheManager) private cacheManager: CacheManager,
    @inject(TYPES.TestCaseResultRepository)
    private testCaseResultRepository: TestCaseResultRepository
  ) {}
  async createMany(data: any[]): Promise<{count: number}> {
    return await this.testCaseResultRepository.batchCreate(data);
  }
}
