import {injectable} from "inversify";
import {PrismaClient, Prisma} from "../../prisma/generated/prisma/index.js";
import {CustomError} from "../utils/errors";

type Delegate<
  TModel,
  TCreateInput,
  TCreateManyInput,
  TUpdateInput,
  TWhereUniqueInput,
  TFindManyArgs,
  TFindFirstArgs,
  TCountArgs,
  TSelect = any,
  TInclude = any,
> = {
  create(args: {data: TCreateInput}): Promise<TModel>;
  findUnique(args: {
    where: TWhereUniqueInput;
    include?: TInclude;
    select?: TSelect;
  }): Promise<TModel | null>;
  findMany(args: TFindManyArgs): Promise<TModel[]>;
  update(args: {where: TWhereUniqueInput; data: TUpdateInput}): Promise<TModel>;
  delete(args: {where: TWhereUniqueInput}): Promise<TModel>;
  findFirst(args: TFindFirstArgs): Promise<TModel | null>;
  createMany?: (args: {data: TCreateManyInput[]}) => Promise<{count: number}>;
  count(args: TCountArgs): Promise<number>;
  upsert(args: {
    where: TWhereUniqueInput;
    create: TCreateInput;
    update: TUpdateInput;
  }): Promise<TModel>;
  deleteMany?: (args: {where: TWhereUniqueInput}) => Promise<{count: number}>;
  $transaction?: (
    fn: (tx: Prisma.TransactionClient) => Promise<any>
  ) => Promise<any>;
  $disconnect?: () => Promise<void>;
  $connect?: () => Promise<void>;
  $use?: (args: Prisma.MiddlewareParams) => Promise<any>;
  $on?: (
    event: Prisma.LogLevel | string,
    callback: (event: any) => void
  ) => void;
  $queryRaw?: <T = any>(query: string | Prisma.Sql) => Promise<T>;
  $executeRaw?: <T = any>(query: string | Prisma.Sql) => Promise<T>;
  $runCommandRaw?: <T = any>(command: Prisma.JsonObject) => Promise<T>;
};

@injectable()
export class BaseRepository<
  TModel,
  TCreateInput,
  TCreateManyInput,
  TUpdateInput,
  TWhereUniqueInput,
  TFindManyArgs = any,
  TFindFirstArgs = any,
  TCountArgs = any,
  TSelect = any,
  TInclude = any,
> {
  protected prisma: PrismaClient;
  protected modelDelegate: Delegate<
    TModel,
    TCreateInput,
    TCreateManyInput,
    TUpdateInput,
    TWhereUniqueInput,
    TFindManyArgs,
    TFindFirstArgs,
    TCountArgs,
    TSelect,
    TInclude
  >;

  constructor(
    prismaClient: PrismaClient,
    modelDelegate: Delegate<
      TModel,
      TCreateInput,
      TCreateManyInput,
      TUpdateInput,
      TWhereUniqueInput,
      TFindManyArgs,
      TFindFirstArgs,
      TCountArgs,
      TSelect,
      TInclude
    >
  ) {
    this.prisma = prismaClient;
    this.modelDelegate = modelDelegate;
  }

  async create(args: {data: TCreateInput}): Promise<TModel> {
    return this.modelDelegate.create({data: args.data});
  }

  async findById(
    where: TWhereUniqueInput | any,
    options?: {select?: TSelect; include?: TInclude}
  ): Promise<TModel | null> {
    return await this.modelDelegate.findUnique({
      where,
      ...options,
    });
  }

  /**
   * Finds the first record matching the filter.
   * @param filter - The filter criteria.
   * @param options - Optional select or include clauses.
   * @returns The first matching record, or null if not found.
   */
  async findFirst(filter: TFindFirstArgs): Promise<TModel | null> {
    return await this.modelDelegate.findFirst(filter);
  }

  /**
   * Finds all records matching the filter.
   * @param filter - The filter criteria.
   * @returns An array of matching records.
   */
  async findAll(filter: TFindManyArgs): Promise<TModel[]> {
    return await this.modelDelegate.findMany(filter);
  }

  /**
   * Updates a record by its unique identifier.
   * @param where - The unique identifier for the record.
   * @param data - The data to update the record with.
   * @returns The updated record.
   */
  async update(where: TWhereUniqueInput, data: TUpdateInput): Promise<TModel> {
    return await this.modelDelegate.update({where, data});
  }

  /**
   * Deletes a record by its unique identifier.
   * @param where - The unique identifier for the record.
   * @returns The deleted record.
   */
  async delete(where: TWhereUniqueInput): Promise<TModel> {
    return await this.modelDelegate.delete({where});
  }

  /**
   * Creates multiple records in a batch.
   * @param data - Array of data to create the records with.
   * @returns The number of records created.
   * @throws Error if createMany is not supported for this model.
   */
  async batchCreate(data: TCreateManyInput[]): Promise<{count: number}> {
    if (!this.modelDelegate.createMany) {
      throw new CustomError("createMany is not supported for this model", 500);
    }
    return await this.modelDelegate.createMany({data});
  }

  /**
   * Counts records matching the filter.
   * @param filter - The filter criteria.
   * @returns The number of matching records.
   */
  async count(filter: TCountArgs): Promise<number> {
    return await this.modelDelegate.count(filter);
  }

  /**
   * Upserts a record (creates if not exists, updates if exists).
   * @param where - The unique identifier for the record.
   * @param create - The data to create the record with if it doesn't exist.
   * @param update - The data to update the record with if it exists.
   * @returns The created or updated record.
   */
  async upsert(
    where: TWhereUniqueInput,
    create: TCreateInput,
    update: TUpdateInput
  ): Promise<TModel> {
    return await this.modelDelegate.upsert({
      where,
      create,
      update,
    });
  }

  /**
   * Executes a callback within a transaction.
   * @param callback - The callback to execute within the transaction.
   * @returns The result of the callback.
   */
  async withTransaction<R>(
    callback: (tx: Prisma.TransactionClient) => Promise<R>
  ): Promise<R> {
    return await this.prisma.$transaction(callback);
  }

  /**
   * Executes a raw SQL query.
   * @param query - The SQL query to execute.
   * @returns The result of the query.
   */
  async deleteMany(where: TWhereUniqueInput): Promise<{count: number}> {
    if (!this.modelDelegate.deleteMany) {
      throw new CustomError("deleteMany is not supported for this model", 500);
    }
    return await this.modelDelegate.deleteMany({where});
  }

  /**
   * Closes the Prisma client connection.
   */
  async close(): Promise<void> {
    await this.prisma.$disconnect();
  }
}
