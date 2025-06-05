import {injectable, inject} from "inversify";
import {TYPES} from "../types";
import {Problem} from "../../prisma/generated/prisma/index";
import {CustomError} from "../utils/errors";
import {CacheManager} from "../utils";
import {ProblemRepository} from "../repositories";

@injectable()
export class ProblemService {
  constructor(
    @inject(TYPES.CacheManager) private cacheManager: CacheManager,
    @inject(TYPES.ProblemRepository)
    private problemRepository: ProblemRepository
    //@inject(TYPES.PrismaClient) private prisma: PrismaClient
  ) {}

  async createProblem(data: any): Promise<Problem> {
    return this.problemRepository.create(data);
  }
  async getAllProblems(id?: string): Promise<Problem[]> {
    // const cached = await this.cacheManager.getCache('problems');
    // if (cached) return JSON.parse(cached);
    const problems = await this.problemRepository.findAll({
      where: {
        userId: id,
      },
      include: {
        submission: true,
      },
    });
    if (!problems) throw new CustomError("No problems found", 404);
    // await this.cacheManager.setCache(
    //   'problems',
    //   JSON.stringify(problems),
    //   3600
    // );
    return problems;
  }

  async deleteProblem(id: string): Promise<Problem> {
    const problem = await this.problemRepository.delete({id});
    if (!problem) throw new CustomError("Problem not found", 404);
    await this.cacheManager.deleteCache(`problem:${id}`);
    return problem;
  }

  async updateProblem(id: string, data: any): Promise<Problem> {
    const problem = await this.problemRepository.update({id}, data);
    if (!problem) throw new CustomError("Problem not found", 404);
    await this.cacheManager.setCache(
      `problem:${id}`,
      JSON.stringify(problem),
      3600
    );
    return problem;
  }
  async getProblemById(query: {
    where: any;
    include: any;
  }): Promise<Problem | null> {
    // const cached = await this.cacheManager.getCache(`problem:${query.where.id}`);
    // if (cached) return JSON.parse(cached);
    const problem = await this.problemRepository.findById(query.where, {
      include: query.include,
    });
    if (!problem) throw new CustomError("Problem not found", 404);
    await this.cacheManager.setCache(
      `problem:${query.where.id}`,
      JSON.stringify(problem),
      3600
    );
    return problem;
  }
}
