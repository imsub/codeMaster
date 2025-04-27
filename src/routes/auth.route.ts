export class AuthRoutes {
  private router: any;
  private authService: any;
  private authValidator: any;
  private logger: any;
  private CustomError: any;
  private express: any;

  constructor(deps: {
    authService: any;
    authValidator: any;
    loggerService: any;
    express: any;
    CustomError: any;
  }) {
    this.router = deps.express.Router();
    this.authService = deps.authService;
    this.authValidator = deps.authValidator;
    this.logger = deps.loggerService;
    this.CustomError = deps.CustomError;
    this.express = deps.express;
    this.setupRoutes();
  }

  private setupRoutes(): void {
    this.router.post("/register", async (req: any, res: any) => {
      try {
        this.authValidator.validateRegister(req.body);
        const token = await this.authService.register(req.body);
        this.logger.info("Register route success", { email: req.body.email });
        res.status(201).json({ token });
      } catch (error: any) {
        this.logger.error("Register route error", { error: error.message });
        throw error;
      }
    });

    this.router.post("/login", async (req: any, res: any) => {
      try {
        this.authValidator.validateLogin(req.body);
        const token = await this.authService.login(req.body);
        this.logger.info("Login route success", { email: req.body.email });
        res.json({ token });
      } catch (error: any) {
        this.logger.error("Login route error", { error: error.message });
        throw error;
      }
    });
  }

  getRouter(): any {
    return this.router;
  }
}
