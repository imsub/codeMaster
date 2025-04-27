export class ModelContainer {
  private static instance: ModelContainer | null = null;
  private container: any;

  static getInstance(container: any): ModelContainer {
    if (!ModelContainer.instance) {
      ModelContainer.instance = new ModelContainer(container);
      ModelContainer.instance.registerModels();
    }
    return ModelContainer.instance;
  }

  constructor(container: any) {
    this.container = container;
  }

  private registerModels(): void {
    // UserModel is auto-registered
  }
}
