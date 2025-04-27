import  App  from "./app.ts";

const app = new App();
await app.init();
const configService: any = app.getContainer().get("ConfigServiceInstance");

const PORT = configService.get("PORT");

app.getApp().listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
