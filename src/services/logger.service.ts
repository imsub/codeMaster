export class LoggerService {
  private logger: any;

  constructor(deps: { winston: any }) {
    this.logger = deps.winston.createLogger({
      level: 'info',
      format: deps.winston.format.combine(
        deps.winston.format.timestamp(),
        deps.winston.format.json()
      ),
      transports: [
        new deps.winston.transports.File({
          filename: 'logs/error.log',
          level: 'error',
        }),
        new deps.winston.transports.File({ filename: 'logs/combined.log' }),
        new deps.winston.transports.Console(),
      ],
    });
  }

  info(message: string, meta: object = {}): void {
    this.logger.info(message, meta);
  }

  error(message: string, meta: object = {}): void {
    this.logger.error(message, meta);
  }

  warn(message: string, meta: object = {}): void {
    this.logger.warn(message, meta);
  }
}
