export class AuthValidator {
  private logger: any;
  private Joi: any;
  private CustomError: any;

  constructor(deps: { loggerService: any; Joi: any; CustomError: any }) {
    this.logger = deps.loggerService;
    this.Joi = deps.Joi;
    this.CustomError = deps.CustomError;
  }

  private registerSchema() {
    return this.Joi.object({
      name: this.Joi.string().min(3).max(30).required(),
      email: this.Joi.string().email().required(),
      password: this.Joi.string().min(6).required(),
    });
  }

  private loginSchema() {
    return this.Joi.object({
      email: this.Joi.string().email().required(),
      password: this.Joi.string().required(),
    });
  }

  validateRegister(data: {
    name: string;
    email: string;
    password: string;
  }): void {
    const { error } = this.registerSchema().validate(data);
    if (error) {
      this.logger.warn("Register validation failed", {
        error: error.details[0].message,
      });
      throw new this.CustomError(error.details[0].message, 400);
    }
  }

  validateLogin(data: { email: string; password: string }): void {
    const { error } = this.loginSchema().validate(data);
    if (error) {
      this.logger.warn("Login validation failed", {
        error: error.details[0].message,
      });
      throw new this.CustomError(error.details[0].message, 400);
    }
  }
}
