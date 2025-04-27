export class DIContainer {
  private static instance: DIContainer | null = null;
  private dependencies: Map<
    string,
    { dependency: any; scope: "singleton" | "request"; deps?: string[] }
  > = new Map();
  private requestScopes: Map<string, Map<string, any>> = new Map();

  static getInstance(): DIContainer {
    if (!DIContainer.instance) {
      DIContainer.instance = new DIContainer();
    }
    return DIContainer.instance;
  }

  register(
    name: string,
    dependency: any,
    scope: 'singleton' | 'request', deps?: string[]
  ): void {
    this.dependencies.set(name, { dependency, scope });
  }

  get(name: string, requestId?: string): any {
    const { dependency, scope } = this.dependencies.get(name) || {};
    if (!dependency) {
      throw new Error(`Dependency ${name} not found`);
    }

    if (scope === "request" && requestId) {
      if (!this.requestScopes.has(requestId)) {
        this.requestScopes.set(requestId, new Map());
      }
      const requestScope = this.requestScopes.get(requestId)!;
      if (!requestScope.has(name)) {
        requestScope.set(name, this.createInstance(dependency));
      }
      return requestScope.get(name);
    }
    if(name === "Express") return dependency;
    return this.createInstance(dependency);
  }

  private createInstance(dependency: any): any {
    if (typeof dependency === "function" && dependency.prototype) {
      return new dependency();
    }
    return dependency;
  }

  createRequestScope(): DIContainer {
    const child = new DIContainer();
    child.dependencies = new Map(this.dependencies);
    return child;
  }

  clearRequestScope(requestId: string): void {
    this.requestScopes.delete(requestId);
  }
}
