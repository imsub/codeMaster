import express from "express";
import cors from "cors";
//import { PrismaClient } from '../prisma/generated/prisma/index.js';
import winston from "winston";
import cookieParser from "cookie-parser";
import helmet from "helmet";
import {injectable, inject} from "inversify";
import {TYPES} from "./types/index";
import {Router} from "./routes/index";
import {ErrorMiddleware, ResponseMiddleware} from "./middlewares";
// import { SwaggerSetup } from './docs/swagger';

@injectable()
export class App {
  private app: express.Express;
  private errorMiddleware: ErrorMiddleware;
  private responseMiddleware: ResponseMiddleware;
  //private logger: winston.Logger;
  private router: Router;
  constructor(
    @inject(TYPES.ErrorMiddleware) errorMiddleware: ErrorMiddleware,
    @inject(TYPES.Logger) logger: winston.Logger,
    @inject(TYPES.Router) router: Router,
    @inject(TYPES.ResponseMiddleware) _responseMiddleware: ResponseMiddleware
  ) {
    this.errorMiddleware = errorMiddleware;
    this.responseMiddleware = _responseMiddleware;
    //this.logger = logger;
    this.router = router;
    this.app = express();
    this.setupMiddleware();
    this.setupResponseHandler();
    this.setupRoutes();
    this.setupErrorHandling();
  }

  private setupMiddleware() {
    this.app.use(
      cors({
        origin: "http://localhost:3000",
        credentials: true, // if you're sending cookies or authorization headers
      })
    );
    this.app.use(helmet());
    this.app.use(express.json());
    this.app.use(cookieParser());
    this.app.use(
      express.static("public", {
        maxAge: "1d", // Cache files for 1 day
        etag: false, // Disable ETag header if not needed
      })
    );
    // this.app.use((req, res, next) => {
    //   console.log(`[${req.method}] ${req.originalUrl}`);
    //   next();
    // });
  }

  private setupRoutes() {
    this.app.use("/api/v1", this.router.getRouter());
  }

  private setupErrorHandling() {
    this.app.use(this.errorMiddleware.handleError());
  }
  private setupResponseHandler() {
    this.app.use(this.responseMiddleware.sendResponse());
  }

  public getApp(): express.Express {
    return this.app;
  }
}
