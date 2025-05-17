import {injectable, inject} from "inversify";
import {TYPES} from "../types";
import {BaseRepository} from "./base.repository";
import {
  TestCaseResult,
  PrismaClient,
  Prisma,
} from "../../prisma/generated/prisma/index.js";
import {CustomError} from "../utils/errors";

@injectable()
export class TestCaseResultRepository extends BaseRepository<
  TestCaseResult,
  Prisma.TestCaseResultCreateInput,
  Prisma.TestCaseResultCreateManyInput,
  Prisma.TestCaseResultUpdateInput,
  Prisma.TestCaseResultWhereUniqueInput,
  Prisma.TestCaseResultFindManyArgs,
  Prisma.TestCaseResultFindFirstArgs,
  Prisma.TestCaseResultCountArgs
> {
  constructor(@inject(TYPES.PrismaClient) private prismaClient: PrismaClient) {
    super(prismaClient, prismaClient.testCaseResult);
  }
}
