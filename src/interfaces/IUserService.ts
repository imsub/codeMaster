import type { User } from '../../prisma/generated/prisma/index';

export interface IUserService {
  getUserById(id: string): Promise<User | null>;
  createUser(data: {
    email: string;
    password: string;
    name?: string;
  }): Promise<User>;
  getAllUsers(): Promise<User[]>;
}
