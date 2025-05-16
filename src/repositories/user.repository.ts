import { injectable, inject } from 'inversify';
import { TYPES } from '../types';
import { BaseRepository } from './base.repository';
// import { IUserRepository } from '../interfaces/IUserRepository';
import {
  User,
  PrismaClient,
  Prisma,
} from '../../prisma/generated/prisma/index.js';
import { CustomError } from '../utils/errors';

@injectable()
export class UserRepository extends BaseRepository<
  User,
  Prisma.UserCreateInput,
  Prisma.UserUpdateInput
> {
  constructor(@inject(TYPES.PrismaClient) private prismaClient: PrismaClient) {
    super(prismaClient, prismaClient.user);
  }
  async findByEmail(email: string): Promise<User | null> {
    return await this.prisma.user.findUnique({
      where: { email },
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

// export class UserRepository
//   extends BaseRepository<User>
//   implements IUserRepository
// {
//   //protected prisma: PrismaClient;
//   //protected db: DB;

//   constructor() {
//     super(new PrismaClient(), 'User');
//   }
//   async findByEmail(email: string): Promise<User | null> {
//     try {
//       return await this.prisma.user.findUnique({
//         where: { email },
//         select: {
//           id: true,
//           email: true,
//           firstName: true,
//           lastName: true,
//           middleName: true,
//           role: true,
//           password: true,
//           image: true,
//           avatar: true,
//           refreshToken: true,
//           createdAt: true,
//           updatedAt: true,
//           emailVerificationToken: true,
//           emailVerificationExpiry: true,
//           forgotPasswordToken: true,
//           forgotPasswordExpiry: true,
//           temporaryPassword: true,
//           temporaryPasswordExpiry: true,
//         },
//       });
//     } catch (error:any) {
//       throw new CustomError('Failed to find user by email', 500, error);
//     }
//   }

//   async findById(id: string): Promise<User> {
//     try {
//       return await this.prisma.User.findUnique({
//         where: { id },
//         select: {
//           id: true,
//           email: true,
//           firstName: true,
//           lastName: true,
//           middleName: true,
//           role: true,
//           password: true,
//           image: true,
//           avatar: true,
//           refreshToken: true,
//           createdAt: true,
//           updatedAt: true,
//           emailVerificationToken: true,
//           emailVerificationExpiry: true,
//           forgotPasswordToken: true,
//           forgotPasswordExpiry: true,
//           temporaryPassword: true,
//           temporaryPasswordExpiry: true,
//         },
//       });
//     } catch (error:any) {
//       throw new CustomError('Failed to find user by ID', 500, error);
//     }
//   }
//   async create(
//     data: {
//       email: string;
//       password: string;
//       firstName: string;
//       avatar: string;
//       lastName: string;
//       middleName: string;
//       role: string;
//       image: string;
//       refreshToken: string;
//       emailVerificationToken: string;
//       emailVerificationExpiry: Date;
//       forgotPasswordToken: string;
//       forgotPasswordExpiry: Date;
//       temporaryPassword: string;
//       temporaryPasswordExpiry: Date;
//     }
//   ): Promise<User> {
//     // try {
//       const user = await this.prisma.User.create({
//         data: {
//           ...data,
//           role: data.role as "USER"
//         }
//       });
//       if (!user) {
//         throw new CustomError('Failed to create user', 500);
//       }
//       return user;
//     // } catch (error:any) {
//     //   throw new CustomError('Failed to create user', 500, error);
//     // }
//   }

//   async findAll(): Promise<User[]> {
//     try {
//       return await this.prisma.user.findMany({
//         select: {
//           id: true,
//           email: true,
//           firstName: true,
//           lastName: true,
//           middleName: true,
//           role: true,
//           password: true,
//           image: true,
//           avatar: true,
//           refreshToken: true,
//           createdAt: true,
//           updatedAt: true,
//           emailVerificationToken: true,
//           emailVerificationExpiry: true,
//           forgotPasswordToken: true,
//           forgotPasswordExpiry: true,
//           temporaryPassword: true,
//           temporaryPasswordExpiry: true,
//         },
//       });
//     } catch (error:any) {
//       throw new CustomError('Failed to find user by ID', 500, error);
//     }
//   }
// Define the User type
