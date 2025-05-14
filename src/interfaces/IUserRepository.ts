import type { User } from '../../prisma/generated/prisma/index';

export interface IUserRepository {
  findById(id: string): Promise<User | null>;
  findByEmail(email: string): Promise<User | null>;
  create(data: {
    email: string;
    password: string;
    firstName: string;
  }): Promise<User>;
  findAll(): Promise<User[]>;
}
