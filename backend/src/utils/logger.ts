import winston from "winston";

export class LoggerFactory {
  static createLogger(): winston.Logger {
    return winston.createLogger({
      level: "info",
      format: winston.format.combine(
        winston.format.timestamp({format: "YYYY-MM-DD HH:mm:ss"}),
        winston.format.errors({stack: true}), // log stack traces
        winston.format.json()
      ),
      transports: [
        // Console transport with level highlighting
        new winston.transports.Console({
          format: winston.format.combine(
            winston.format.colorize(),
            winston.format.simple()
          ),
        }),

        // File transport for errors only
        new winston.transports.File({
          filename: "logs/error.log",
          level: "error",
        }),

        // File transport for warnings
        new winston.transports.File({
          filename: "logs/warn.log",
          level: "warn",
        }),

        // File transport for all logs (combined)
        new winston.transports.File({
          filename: "logs/combined.log",
        }),
      ],
      exitOnError: false,
    });
  }
}
