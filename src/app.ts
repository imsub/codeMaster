import {
  DIContainer,
  autoRegisterDependencies,
  CustomError,
} from "./utils/index.ts";
import {
  ServiceContainer,
  ModelContainer,
  ValidatorContainer,
  MiddlewareContainer,
  RouteContainer,
} from "./containers/index.ts";
import { LoggerService, AuthService, ConfigService } from "./services/index.ts";
import { UserModel } from "./models/index.ts";
import { AuthValidator } from "./validators/index.ts";
import {
  AuthMiddleware,
  ErrorMiddleware,
  RequestScopeMiddleware,
} from "./middlewares/index.ts";
import { AuthRoutes } from "./routes/index.ts";
import express from "express";
import { PrismaClient } from "../prisma/generated/prisma/index.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import Joi from "joi";
import winston from "winston";
import url from "url";
import path from "path";
import dotenv from "dotenv";
import fs from "fs";

const fileURLToPath = url.fileURLToPath;
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default class App {
  private app: any;
  private container: any;

  constructor() {
    this.container = DIContainer.getInstance();
  }
  public async init() {
    await this.setupDependencies();
    this.app = this.container.get("Express")();
    this.setup();
  }

  private async setupDependencies(): Promise<void> {
    const externalModules = {
      Express: express,
      PrismaClient: PrismaClient,
      Bcrypt: bcrypt,
      Jwt: jwt,
      Joi: Joi,
      Winston: winston,
      Dotenv: dotenv,
      Path: path,
      Url: url,
      Fs: fs,
    };
    const internalClasses = {
      CustomError,
      LoggerService,
      ConfigService,
      UserModel,
      AuthService,
      AuthValidator,
      AuthMiddleware,
      ErrorMiddleware,
      RequestScopeMiddleware,
      AuthRoutes,
    };

    Object.entries(externalModules).forEach(([key, module]) => {
      this.container.register(key, module, "singleton");
    });

    Object.entries(internalClasses).forEach(([key, cls]) => {
      this.container.register(key, cls, "singleton");
    });

    await autoRegisterDependencies(this.container, __dirname);

    this.container.register("Container", this.container, "singleton");
    this.container.register(
      "LoggerServiceInstance",
      new LoggerService({ winston: this.container.get("Winston") }),
      "singleton"
    );
    this.container.register(
      "ConfigServiceInstance",
      new ConfigService({
        Joi: this.container.get("Joi"),
        loggerService: this.container.get("LoggerServiceInstance"),
        dotenv: this.container.get("Dotenv"),
        path: this.container.get("Path"),
        url: this.container.get("Url"),
      }),
      "singleton"
    );
    this.container.register(
      "UserModelInstance",
      new UserModel({
        PrismaClient: this.container.get("PrismaClient"),
        loggerService: this.container.get("LoggerServiceInstance"),
        CustomError: this.container.get("CustomError"),
      }),
      "singleton"
    );
    this.container.register(
      "AuthServiceInstance",
      new AuthService({
        userModel: this.container.get("UserModelInstance"),
        loggerService: this.container.get("LoggerServiceInstance"),
        bcrypt: this.container.get("Bcrypt"),
        jwt: this.container.get("Jwt"),
        CustomError: this.container.get("CustomError"),
      }),
      "singleton"
    );
    this.container.register(
      "AuthValidatorInstance",
      new AuthValidator({
        loggerService: this.container.get("LoggerServiceInstance"),
        Joi: this.container.get("Joi"),
        CustomError: this.container.get("CustomError"),
      }),
      "singleton"
    );
    this.container.register(
      "AuthMiddlewareInstance",
      new AuthMiddleware({
        loggerService: this.container.get("LoggerServiceInstance"),
        jwt: this.container.get("Jwt"),
        CustomError: this.container.get("CustomError"),
      }),
      "singleton"
    );
    this.container.register(
      "ErrorMiddlewareInstance",
      new ErrorMiddleware({
        loggerService: this.container.get("LoggerServiceInstance"),
      }),
      "singleton"
    );
    this.container.register(
      "RequestScopeMiddlewareInstance",
      new RequestScopeMiddleware({
        container: this.container.get("Container"),
      }),
      "singleton"
    );
    this.container.register(
      "AuthRoutesInstance",
      new AuthRoutes({
        authService: this.container.get("AuthServiceInstance"),
        authValidator: this.container.get("AuthValidatorInstance"),
        loggerService: this.container.get("LoggerServiceInstance"),
        express: this.container.get("Express"),
        CustomError: this.container.get("CustomError"),
      }),
      "singleton"
    );

    ServiceContainer.getInstance(this.container);
    ModelContainer.getInstance(this.container);
    ValidatorContainer.getInstance(this.container);
    MiddlewareContainer.getInstance(this.container);
    RouteContainer.getInstance(this.container);
  }

  private setup(): void {
    this.app.use(express.json());
    const loggerService = this.container.get("LoggerServiceInstance");
    const requestScopeMiddleware = this.container.get(
      "RequestScopeMiddlewareInstance"
    );
    const authRoutes = this.container.get("AuthRoutesInstance");
    const errorMiddleware = this.container.get("ErrorMiddlewareInstance");

    this.app.use(
      requestScopeMiddleware.setupRequestScope.bind(requestScopeMiddleware)
    );
    this.app.use((req: any, res: any, next: any) => {
      loggerService.info("Incoming request", {
        method: req.method,
        path: req.path,
        ip: req.ip,
      });
      next();
    });

    this.app.use("/api/auth", authRoutes.getRouter());
    this.app.use(errorMiddleware.handleError.bind(errorMiddleware));
  }

  getApp(): any {
    return this.app;
  }

  getContainer(): any {
    return this.container;
  }
}
