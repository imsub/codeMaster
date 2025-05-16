import { PrismaClient, Prisma } from '../../prisma/generated/prisma/index.js';
import { CustomError } from '../utils/errors';
import { injectable } from 'inversify';

@injectable()
export class BaseRepository<TModel, TCreateInput, TUpdateInput> {
  protected prisma: PrismaClient;
  protected modelDelegate: any;

  constructor(prismaClient: PrismaClient, modelDelegate: any) {
    this.prisma = prismaClient;
    this.modelDelegate = modelDelegate;
  }

  async create(data: TCreateInput): Promise<TModel> {
    return await this.modelDelegate.create({ data });
  }

  async findById(id: any): Promise<TModel | null> {
    return this.modelDelegate.findUnique({ where: { id } });
  }

  async findAll(filter?: any): Promise<TModel[]> {
    if (!!filter) {
      return this.modelDelegate.findMany(filter);
    }
    return this.modelDelegate.findMany();
  }

  async update(id: any, data: TUpdateInput): Promise<TModel> {
    return this.modelDelegate.update({
      where: { id },
      data: {
        ...data,
      },
    });
  }

  async delete(id: any): Promise<TModel> {
    return this.modelDelegate.delete({ where: { id } });
  }
  async findFirst(
    where?: Prisma.UserWhereInput,
    select?: Prisma.UserSelect
  ): Promise<TModel | null> {
    return await this.modelDelegate.findFirst({
      where,
      select,
    });
  }
  async batchCreate(data: TCreateInput[]): Promise<{ count: number }> {
    return this.modelDelegate.createMany({ data });
  }

  async count(
    where?: Prisma.UserWhereInput | Prisma.UserSelect | any,
    select?: Prisma.UserSelect
  ): Promise<number> {
    return await this.modelDelegate.count({
      where,
      select,
    });
  }
}
