export class ServiceContainer {
  private static instance: ServiceContainer | null = null;
  private container: any;

  static getInstance(container: any): ServiceContainer {
    if (!ServiceContainer.instance) {
      ServiceContainer.instance = new ServiceContainer(container);
      ServiceContainer.instance.registerServices();
    }
    return ServiceContainer.instance;
  }

  constructor(container: any) {
    this.container = container;
  }

  private registerServices(): void {
    // Services are auto-registered
  }
}
