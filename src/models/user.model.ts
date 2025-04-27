export class UserModel {
  private prisma: any;
  private logger: any;
  private CustomError: any;

  constructor(deps: {
    PrismaClient: any;
    loggerService: any;
    CustomError: any;
  }) {
    this.prisma = deps.PrismaClient;
    this.logger = deps.loggerService;
    this.CustomError = deps.CustomError;
  }

  async create(userData: {
    name: string;
    email: string;
    password: string;
  }): Promise<UserModel> {
    try {
      const user = await this.prisma.user.create({ data: userData });
      this.logger.info("User created", { userId: user.id });
      return user;
    } catch (error: any) {
      this.logger.error("Error creating user", { error: error.message });
      throw new this.CustomError("Failed to create user", 500);
    }
  }

  async findByEmail(email: string): Promise<UserModel> {
    try {
      const user = await this.prisma.user.findUnique({ where: { email } });
      this.logger.info("User fetched by email", { email });
      return user;
    } catch (error: any) {
      this.logger.error("Error fetching user by email", {
        error: error.message,
      });
      throw new this.CustomError("Failed to fetch user", 500);
    }
  }

  async findById(id: number): Promise<UserModel> {
    try {
      const user = await this.prisma.user.findUnique({ where: { id } });
      this.logger.info("User fetched by id", { userId: id });
      return user;
    } catch (error: any) {
      this.logger.error("Error fetching user by id", { error: error.message });
      throw new this.CustomError("Failed to fetch user", 500);
    }
  }
}
