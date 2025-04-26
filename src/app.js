import healthCheckRouter from "../src/routes/healthcheck.routes.js"
import authRoutes from "../src/routes/auth.routes.js"
import errorHandler from "../src/utils/error.js"
import cookieParser from "cookie-parser";

import express from "express";
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use("/api/v1/healthcheck", healthCheckRouter);
app.use("/api/v1/auth" , authRoutes);
app.use(errorHandler);

export default app;