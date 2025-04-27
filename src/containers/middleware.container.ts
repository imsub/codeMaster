export class MiddlewareContainer {
  private static instance: MiddlewareContainer | null = null;
  private container: any;

  static getInstance(container: any): MiddlewareContainer {
    if (!MiddlewareContainer.instance) {
      MiddlewareContainer.instance = new MiddlewareContainer(container);
      MiddlewareContainer.instance.registerMiddlewares();
    }
    return MiddlewareContainer.instance;
  }

  constructor(container: any) {
    this.container = container;
  }

  private registerMiddlewares(): void {
    // Middlewares are auto-registered
  }
}
