import {injectable, inject} from "inversify";
import {TYPES} from "../types";
import {BaseRepository} from "./base.repository";
import {
  Problem,
  PrismaClient,
  Prisma,
} from "../../prisma/generated/prisma/index.js";
import {CustomError} from "../utils/errors";

@injectable()
export class ProblemRepository extends BaseRepository<
  Problem,
  Prisma.ProblemCreateInput,
  Prisma.ProblemCreateManyInput,
  Prisma.ProblemUpdateInput,
  Prisma.ProblemWhereUniqueInput,
  Prisma.ProblemFindManyArgs,
  Prisma.ProblemFindFirstArgs,
  Prisma.ProblemCountArgs
> {
  constructor(@inject(TYPES.PrismaClient) private prismaClient: PrismaClient) {
    super(prismaClient, prismaClient.problem);
  }
}
