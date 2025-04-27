export class RequestScopeMiddleware {
  private container: any;

  constructor(deps: { container: any }) {
    this.container = deps.container;
  }

  setupRequestScope(req: any, res: any, next: any): void {
    req.requestId = Date.now().toString();
    req.scope = this.container.createRequestScope();
    res.on("finish", () => {
      this.container.clearRequestScope(req.requestId);
    });
    next();
  }
}
