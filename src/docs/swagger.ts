import swaggerUi from "swagger-ui-express";
import {Express} from "express";

/**
 * Class for setting up Swagger API documentation
 */
export class SwaggerSetup {
  private swaggerDocument = {
    openapi: "3.0.0",
    info: {
      title: "LeetLab API",
      version: "1.0.0",
      description: "API for LeetLab, a LeetCode clone",
    },
    servers: [
      {url: "http://localhost:3000", description: "Development server"},
    ],
    paths: {
      "/auth/register": {
        post: {
          summary: "Register a new user",
          requestBody: {
            required: true,
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    email: {type: "string"},
                    password: {type: "string"},
                    name: {type: "string"},
                  },
                },
              },
            },
          },
          responses: {
            "200": {description: "User registered successfully"},
          },
        },
      },
      "/auth/login": {
        post: {
          summary: "Login a user",
          requestBody: {
            required: true,
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    email: {type: "string"},
                    password: {type: "string"},
                  },
                },
              },
            },
          },
          responses: {
            "200": {description: "User logged in successfully"},
          },
        },
      },
    },
  };

  setupSwagger(app: Express) {
    app.use(
      "/api-docs",
      swaggerUi.serve,
      swaggerUi.setup(this.swaggerDocument)
    );
  }
}
