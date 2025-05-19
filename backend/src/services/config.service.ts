export class ConfigService {
  private config: {[key: string]: string | number};
  private Joi: string;
  private logger: string;
  private dotenv: string;
  private path: string;
  private url: string;
  constructor(deps: {
    Joi: any;
    loggerService: any;
    dotenv: any;
    path: any;
    url: any;
  }) {
    this.Joi = deps.Joi;
    this.logger = deps.loggerService;
    this.dotenv = deps.dotenv;
    this.path = deps.path;
    this.url = deps.url;
    this.config = this.validateConfig();
  }

  private validateConfig(): {[key: string]: string | number} {
    const schema = this.Joi.object({
      DATABASE_URL: this.Joi.string().required(),
      JWT_SECRET: this.Joi.string().min(32).required(),
      PORT: this.Joi.number().default(3000),
    });
    this.dotenv.config({path: this.path.resolve(process.cwd(), ".env")});
    const schemaKeys = Object.keys(schema.describe().keys);
    const filteredEnv = Object.fromEntries(
      schemaKeys.map(key => [key, process.env[key]])
    );
    const {error, value} = schema
      .prefs({errors: {label: "key"}})
      .validate(filteredEnv, {
        abortEarly: false,
      });
    if (error) {
      this.logger.error("Configuration validation failed", {
        error: error.message,
      });
      throw new Error(`Configuration validation failed: ${error.message}`);
    }
    return value;
  }

  public get(key: string): string | number {
    return this.config[key];
  }
}
