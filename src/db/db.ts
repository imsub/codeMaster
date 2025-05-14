import { PrismaClient } from '../../prisma/generated/prisma/index.js';
import { injectable } from 'inversify';

@injectable()
export class DB {
  private prisma: PrismaClient;
  constructor() {
    this.prisma = new PrismaClient();
  }
  public getClient(): PrismaClient {
    return this.prisma;
  }
}
