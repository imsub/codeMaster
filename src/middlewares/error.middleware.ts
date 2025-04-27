export class ErrorMiddleware {
  private logger: any;

  constructor(deps: { loggerService: any }) {
    this.logger = deps.loggerService;
  }

  handleError(err: any, req: any, res: any, next: any): void {
    const statusCode = err.statusCode || 500;
    const message = err.message || "Internal Server Error";
    this.logger.error("Error occurred", {
      error: message,
      stack: err.stack,
      path: req.path,
    });
    res.status(statusCode).json({ error: message });
  }
}
