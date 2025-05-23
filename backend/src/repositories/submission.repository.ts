import {injectable, inject} from "inversify";
import {TYPES} from "../types";
import {BaseRepository} from "./base.repository";
import {
  Submission,
  PrismaClient,
  Prisma,
} from "../../prisma/generated/prisma/index.js";

@injectable()
export class SubmissionRepository extends BaseRepository<
  Submission,
  Prisma.SubmissionCreateInput,
  Prisma.SubmissionCreateManyInput,
  Prisma.SubmissionUpdateInput,
  Prisma.SubmissionWhereUniqueInput,
  Prisma.SubmissionFindManyArgs,
  Prisma.SubmissionFindFirstArgs,
  Prisma.SubmissionCountArgs,
  Prisma.SubmissionSelect,
  Prisma.SubmissionInclude
> {
  constructor(@inject(TYPES.PrismaClient) private prismaClient: PrismaClient) {
    super(prismaClient, prismaClient.submission);
  }
}
