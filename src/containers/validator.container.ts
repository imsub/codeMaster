export class ValidatorContainer {
  private static instance: ValidatorContainer | null = null;
  private container: any;

  static getInstance(container: any): ValidatorContainer {
    if (!ValidatorContainer.instance) {
      ValidatorContainer.instance = new ValidatorContainer(container);
      ValidatorContainer.instance.registerValidators();
    }
    return ValidatorContainer.instance;
  }

  constructor(container: any) {
    this.container = container;
  }

  private registerValidators(): void {
    // AuthValidator is auto-registered
  }
}
