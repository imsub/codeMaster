export class AuthService {
  private userModel: any;
  private logger: any;
  private bcrypt: any;
  private jwt: any;
  private CustomError: any;

  constructor(deps: {
    userModel: any;
    loggerService: any;
    bcrypt: any;
    jwt: any;
    CustomError: any;
  }) {
    this.userModel = deps.userModel;
    this.logger = deps.loggerService;
    this.bcrypt = deps.bcrypt;
    this.jwt = deps.jwt;
    this.CustomError = deps.CustomError;
  }

  async register({
    name,
    email,
    password,
  }: {
    name: string;
    email: string;
    password: string;
  }): Promise<string> {
    try {
      const hashedPassword = await this.bcrypt.hash(password, 10);
      const user = await this.userModel.create({
        name,
        email,
        password: hashedPassword,
      });
      const token = this.generateToken(user);
      this.logger.info("User registered", { userId: user.id });
      return token;
    } catch (error: any) {
      this.logger.error("Error registering user", { error: error.message });
      throw new this.CustomError("Registration failed", 500);
    }
  }

  async login({
    email,
    password,
  }: {
    email: string;
    password: string;
  }): Promise<string> {
    try {
      const user = await this.userModel.findByEmail(email);
      if (!user) {
        throw new this.CustomError("User not found", 404);
      }

      const isValid = await this.bcrypt.compare(password, user.password);
      if (!isValid) {
        throw new this.CustomError("Invalid credentials", 401);
      }

      const token = this.generateToken(user);
      this.logger.info("User logged in", { userId: user.id });
      return token;
    } catch (error: any) {
      this.logger.error("Error logging in user", { error: error.message });
      throw error;
    }
  }

  private generateToken(user: any): string {
    return this.jwt.sign(
      { id: user.id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );
  }
}
