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

  async upsert(query: {
    where: any;
    create: any;
    update: any;
  }): Promise<ProblemSolved> {
    return this.problemSolvedRepository.upsert(
      query.where,
      query.create,
      query.update
    );
  }
}
