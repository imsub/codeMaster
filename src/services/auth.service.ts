import {injectable, inject} from "inversify";
import {TYPES} from "../types";
import {User, Prisma} from "../../prisma/generated/prisma/index";
import {CustomError} from "../utils/errors";
import {CacheManager} from "../utils";
import {PrismaClient} from "@prisma/client";
import bcrypt from "bcrypt";
import {IAuthStrategy} from "../interfaces/IAuthStrategy";
import {UserRepository} from "../repositories/user.repository";

@injectable()
export class AuthService {
  constructor(
    @inject(TYPES.UserRepository) private userRepository: UserRepository,
    @inject(TYPES.CacheManager) private cacheManager: CacheManager,
    @inject(TYPES.AuthStrategy) private authStrategy: IAuthStrategy,
    @inject(TYPES.PrismaClient) private prisma: PrismaClient
  ) {}

  async getUserById(id: any): Promise<User | null> {
    const user = await this.userRepository.findById(id);
    if (!user) {
      throw new CustomError("User not found", 404);
    }
    return user;
  }
  async getToken(user: {
    id: string;
    role?: string;
    email?: string;
    tokenType: string;
  }): Promise<string | null> {
    //const token = await this.cacheManager.getCache(`${user.tokenType} Token:${user.id}`) || this.authStrategy.generateToken(user);
    const token = this.authStrategy.generateToken(user);
    //await this.cacheManager.setCache(`${user.tokenType} Token:${user.id}`, token, 3600);
    if (!token) {
      throw new CustomError("Token not found", 404);
    }
    return token;
  }
  async createUser(data: any): Promise<User> {
    const result: User = await this.userRepository.create(data);
    await this.cacheManager.setCache(
      `User:${result.id}`,
      JSON.stringify(result),
      3600
    );
    return result;
  }

  async isEmailTaken(email: string): Promise<boolean> {
    const user = await this.userRepository.findByEmail(email);
    return !!user;
  }
  async getRecordByMultipleFields(where?: any): Promise<User | null> {
    const user = await this.userRepository.findFirst({where});
    return user;
  }

  async getUserByEmail(email: string): Promise<User | null> {
    const user = await this.userRepository.findByEmail(email);
    return user;
  }

  async login(email: string, password: string): Promise<string> {
    const user = await this.userRepository.findByEmail(email);
    if (!user || !(await bcrypt.compare(password, user.password))) {
      throw new CustomError("Invalid credentials", 401);
    }
    const token = this.authStrategy.generateToken(user);
    await this.cacheManager.setCache(`token:${user.id}`, token, 3600);
    return token;
  }

  async logout(token: string): Promise<void> {
    try {
      const decoded = this.authStrategy.verifyToken(token);
      await this.prisma.tokenBlacklist.create({
        data: {
          token,
          expiresAt: new Date(Date.now() + 3600 * 1000),
        },
      });
      await this.prisma.$transaction(async (tx: any) => {
        await tx.tokenBlacklist.create({
          data: {token, expiresAt: new Date(Date.now() + 3600 * 1000)},
        });
      });
      await this.cacheManager.setCache(`blacklist:${token}`, "true", 3600);
    } catch (error: any) {
      throw new CustomError("Failed to blacklist token", 500, error);
    }
  }
  async updateUser(data: User): Promise<User> {
    const user = await this.userRepository.findById(data.id as any);
    if (!user) {
      throw new CustomError("User not found", 404);
    }
    const {id, ...safeUser} = data;
    const updatedUser = await this.userRepository.update(
      id as any,
      safeUser as any
    );
    if (!updatedUser) {
      throw new CustomError("Failed to update user", 500);
    }
    return updatedUser;
  }
  async deleteUser(id: string): Promise<void> {
    const user = await this.userRepository.findById(id as any);
    if (!user) {
      throw new CustomError("User not found", 404);
    }
    await this.userRepository.delete(id as any);
    await this.cacheManager.deleteCache(`User:${id}`);
  }
}
