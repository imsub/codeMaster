import {injectable, inject} from "inversify";
import {TYPES} from "../types";
import {BaseRepository} from "./base.repository";
import {
  User,
  PrismaClient,
  Prisma,
} from "../../prisma/generated/prisma/index.js";

@injectable()
export class UserRepository extends BaseRepository<
  User,
  Prisma.UserCreateInput,
  Prisma.UserCreateManyInput,
  Prisma.UserUpdateInput,
  Prisma.UserWhereUniqueInput,
  Prisma.UserFindManyArgs,
  Prisma.UserFindFirstArgs,
  Prisma.UserCountArgs,
  Prisma.UserSelect,
  Prisma.UserInclude
> {
  constructor(@inject(TYPES.PrismaClient) private prismaClient: PrismaClient) {
    super(prismaClient, prismaClient.user);
  }
  async findByEmail(email: string): Promise<User | null> {
    return await this.prisma.user.findUnique({
      where: {email},
      select: {
        id: true,
        email: true,
        firstName: true,
        lastName: true,
        middleName: true,
        role: true,
        password: true,
        image: true,
        avatar: true,
        refreshToken: true,
        createdAt: true,
        updatedAt: true,
        isEmailVerified: true,
        emailVerificationToken: true,
        emailVerificationExpiry: true,
        forgotPasswordToken: true,
        forgotPasswordExpiry: true,
        temporaryPassword: true,
        temporaryPasswordExpiry: true,
      },
    });
  }
}
