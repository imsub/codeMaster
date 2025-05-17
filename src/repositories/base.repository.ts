import { PrismaClient, Prisma } from '../../prisma/generated/prisma/index.js';
import { injectable } from 'inversify';

type Delegate<
  TModel,
  TCreateInput,
  TCreateManyInput,
  TUpdateInput,
  TWhereUniqueInput,
> = {
  create(args: { data: TCreateInput }): Promise<TModel>;
  findUnique(args: {
    where: TWhereUniqueInput;
    include?: any;
    select?: any;
  }): Promise<TModel | null>;
  findMany(args?: any): Promise<TModel[]>;
  update(args: {
    where: TWhereUniqueInput;
    data: TUpdateInput;
  }): Promise<TModel>;
  delete(args: { where: TWhereUniqueInput }): Promise<TModel>;
  findFirst(args: {
    where?: any;
    include?: any;
    select?: any;
  }): Promise<TModel | null>;
  createMany(args: { data: TCreateManyInput[] }): Promise<{ count: number }>;
  count(args?: { where?: any; select?: any }): Promise<number>;
  upsert(args: {
    where: TWhereUniqueInput;
    create: TCreateInput;
    update: TUpdateInput;
  }): Promise<TModel>;
};

@injectable()
export class BaseRepository<
  TModel,
  TCreateInput,
  TCreateManyInput,
  TUpdateInput,
  TWhereUniqueInput,
> {
  protected prisma: PrismaClient;
  protected modelDelegate: Delegate<
    TModel,
    TCreateInput,
    TCreateManyInput,
    TUpdateInput,
    TWhereUniqueInput
  >;

  constructor(
    prismaClient: PrismaClient,
    modelDelegate: Delegate<
      TModel,
      TCreateInput,
      TCreateManyInput,
      TUpdateInput,
      TWhereUniqueInput
    >
  ) {
    this.prisma = prismaClient;
    this.modelDelegate = modelDelegate;
  }

  async create(data: TCreateInput): Promise<TModel> {
    return this.modelDelegate.create({ data });
  }

  async findById(
    where: TWhereUniqueInput,
    options?: { select?: any; include?: any }
  ): Promise<TModel | null> {
    return this.modelDelegate.findUnique({
      where,
      ...options,
    });
  }

  async findFirst(
    filter?: any,
    options?: { select?: any; include?: any }
  ): Promise<TModel | null> {
    return this.modelDelegate.findFirst({
      where: filter,
      ...options,
    });
  }

  async findAll(filter?: any): Promise<TModel[]> {
    return this.modelDelegate.findMany(filter);
  }

  async update(where: TWhereUniqueInput, data: TUpdateInput): Promise<TModel> {
    return this.modelDelegate.update({ where, data });
  }

  async delete(where: TWhereUniqueInput): Promise<TModel> {
    return this.modelDelegate.delete({ where });
  }

  async batchCreate(data: TCreateManyInput[]): Promise<{ count: number }> {
    return this.modelDelegate.createMany({ data });
  }

  async count(filter?: { where?: any; select?: any }): Promise<number> {
    return this.modelDelegate.count(filter);
  }

  async upsert(
    where: TWhereUniqueInput,
    create: TCreateInput,
    update: TUpdateInput
  ): Promise<TModel> {
    return this.modelDelegate.upsert({
      where,
      create,
      update,
    });
  }

  async withTransaction<R>(
    callback: (tx: Prisma.TransactionClient) => Promise<R>
  ): Promise<R> {
    return this.prisma.$transaction(callback);
  }
}
