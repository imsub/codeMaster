import {injectable, inject} from "inversify";
import {TYPES} from "../types";
import {Submission} from "../../prisma/generated/prisma/index";
import {CustomError} from "../utils/errors";
import {CacheManager} from "../utils";
import {SubmissionRepository} from "../repositories";

@injectable()
export class ExecuteCodeService {
  constructor(
    @inject(TYPES.CacheManager) private cacheManager: CacheManager,
    @inject(TYPES.ProblemRepository)
    private problemRepository: SubmissionRepository
  ) {}
}
