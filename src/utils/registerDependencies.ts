export const autoRegisterDependencies = async (
  container: any,
  basePath: string
): Promise<void> => {
  const promises = container.get("Fs").promises;
  const path = container.get("Path");
  const directories = [
    "services",
    "models",
    "validators",
    "middlewares",
    "routes",
  ];
  try {
    for (const dir of directories) {
      const dirPath = path.join(basePath, dir);
      const files = await promises.readdir(dirPath);
      for (const file of files) {
        if (file.endsWith(".ts") || file.endsWith(".js")) {
          const moduleName = file.replace(/.(ts|js)$/, "");
          const module = await import(
            path
              .relative(
                path.dirname(
                  container.get("Url").fileURLToPath(import.meta.url)
                ),
                path.join(dirPath, file)
              )
              .replace(/\\/g, "/")
          );
          const moduleClass = module[Object.keys(module)[0]];
          const typeKey = `${
            moduleName.charAt(0).toUpperCase() + moduleName.slice(1)
          }`;
          container.register(typeKey, moduleClass, "singleton");
        }
      }
    }
  } catch (err) {
    console.warn(`Skipping directory: ${basePath} (Reason: ${err.message})`);
  }
};
