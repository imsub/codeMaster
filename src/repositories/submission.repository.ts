import {injectable, inject} from "inversify";
import {TYPES} from "../types";
import {BaseRepository} from "./base.repository";
import {
  Submission,
  PrismaClient,
  Prisma,
} from "../../prisma/generated/prisma/index.js";
import {CustomError} from "../utils/errors";

@injectable()
export class SubmissionRepository extends BaseRepository<
  Submission,
  Prisma.SubmissionCreateInput,
  Prisma.SubmissionCreateManyInput,
  Prisma.SubmissionUpdateInput,
  Prisma.SubmissionWhereUniqueInput,
  Prisma.SubmissionFindManyArgs,
  Prisma.SubmissionFindFirstArgs,
  Prisma.SubmissionCountArgs
> {
  constructor(@inject(TYPES.PrismaClient) private prismaClient: PrismaClient) {
    super(prismaClient, prismaClient.submission);
  }
}
