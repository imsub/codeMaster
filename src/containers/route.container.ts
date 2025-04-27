export class RouteContainer {
  private static instance: RouteContainer | null = null;
  private container: any;

  static getInstance(container: any): RouteContainer {
    if (!RouteContainer.instance) {
      RouteContainer.instance = new RouteContainer(container);
      RouteContainer.instance.registerRoutes();
    }
    return RouteContainer.instance;
  }

  constructor(container: any) {
    this.container = container;
  }

  private registerRoutes(): void {
    // AuthRoutes is auto-registered
  }
}
