import {injectable, inject} from "inversify";
import {TYPES} from "../types";
import {BaseRepository} from "./base.repository";
import {
  ProblemSolved,
  PrismaClient,
  Prisma,
} from "../../prisma/generated/prisma/index.js";
import {CustomError} from "../utils/errors";

@injectable()
export class ProblemSolvedRepository extends BaseRepository<
  ProblemSolved,
  Prisma.ProblemSolvedCreateInput,
  Prisma.ProblemSolvedCreateManyInput,
  Prisma.ProblemSolvedUpdateInput,
  Prisma.ProblemSolvedWhereUniqueInput,
  Prisma.ProblemSolvedFindManyArgs,
  Prisma.ProblemSolvedFindFirstArgs,
  Prisma.ProblemSolvedCountArgs
> {
  constructor(@inject(TYPES.PrismaClient) private prismaClient: PrismaClient) {
    super(prismaClient, prismaClient.problemSolved);
  }
}
