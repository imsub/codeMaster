// import { injectable, inject } from 'inversify';
// import { TYPES } from '../types';
// import { IUserRepository } from '../interfaces/IUserRepository';
// import { IAuthService, IAuthStrategy } from '../interfaces';

// import { PrismaClient } from '@prisma/client';
// import bcrypt from 'bcrypt';
// import { CustomError } from '../utils/errors';
// import { LogDecorator } from '../utils/decorator';
// import { CacheManager } from '../utils';

// /**
//  * Service class for handling user authentication
//  */
// @injectable()
// export class AuthService implements IUserService {
//    constructor(
//     @inject(TYPES.UserRepository) private userRepository: IUserRepository
//   ) {
//     this.userRepository = userRepository;
//   }

//   async register(
//     email: string,
//     password: string,
//     firstName: string
//   ): Promise<string> {
//     const existingUser = await this.userRepository.findByEmail(email);
//     if (existingUser) {
//       throw new CustomError('Email already exists', 400);
//     }
//     const hashedPassword = await bcrypt.hash(password, 10);
//     const user = await this.userRepository.create({
//       email,
//       password: hashedPassword,
//       name,
//     });
//     const token = this.authStrategy.generateToken(user);
//     await this.cacheManager.setCache(`token:${user.id}`, token, 3600);
//     return token;
//   }

//   async login(email: string, password: string): Promise<string> {
//     const user = await this.userRepository.findByEmail(email);
//     if (!user || !(await bcrypt.compare(password, user.password))) {
//       throw new CustomError('Invalid credentials', 401);
//     }
//     const token = this.authStrategy.generateToken(user);
//     await this.cacheManager.setCache(`token:${user.id}`, token, 3600);
//     return token;
//   }

//   async logout(token: string): Promise<void> {
//     try {
//       const decoded = this.authStrategy.verifyToken(token);
//       await this.prisma.tokenBlacklist.create({
//         data: {
//           token,
//           expiresAt: new Date(Date.now() + 3600 * 1000),
//         },
//       });
//       await this.prisma.$transaction(async (tx) => {
//         await tx.tokenBlacklist.create({
//           data: { token, expiresAt: new Date(Date.now() + 3600 * 1000) },
//         });
//       });
//       await this.cacheManager.setCache(`blacklist:${token}`, 'true', 3600);
//     } catch (error) {
//       throw new CustomError('Failed to blacklist token', 500, error);
//     }
//   }

//   async refreshToken(token: string): Promise<string> {
//     const cached = await this.cacheManager.getCache(`blacklist:${token}`);
//     if (cached) throw new CustomError('Token is blacklisted', 401);
//     const decoded = this.authStrategy.verifyToken(token);
//     const user = await this.userRepository.findById(decoded.id);
//     if (!user) throw new CustomError('User not found', 404);
//     const newToken = this.authStrategy.generateToken(user);
//     await this.cacheManager.setCache(`token:${user.id}`, newToken, 3600);
//     return newToken;
//   }
//   async verifyToken(token: string): Promise<{ id: string; role: string }> {
//     const cached = await this.cacheManager.getCache(`blacklist:${token}`);
//     if (cached) throw new CustomError('Token is blacklisted', 401);
//     return this.authStrategy.verifyToken(token);
//   }
// }
