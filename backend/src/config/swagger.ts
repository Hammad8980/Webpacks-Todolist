import swaggerJSDoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";
import { Express } from "express";
import path from "path";

const options: swaggerJSDoc.Options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Todo List API",
      version: "1.0.0",
      description:
        "A simple and elegant Todo List API built with Express.js and MongoDB",
      contact: {
        name: "API Support",
        email: "support@todoapi.com",
      },
    },
    servers: [
      {
        url:
          process.env.NODE_ENV === "production"
            ? "https://your-production-url.com/api"
            : `http://localhost:${process.env.PORT || 5000}/api`,
        description:
          process.env.NODE_ENV === "production"
            ? "Production server"
            : "Development server",
      },
    ],
    components: {
      schemas: {
        Task: {
          type: "object",
          required: ["title", "isCompleted", "priority"],
          properties: {
            _id: {
              type: "string",
              description: "The auto-generated id of the task",
              example: "64f123abc456def789012345",
            },
            title: {
              type: "string",
              description: "The title of the task",
              example: "Complete project documentation",
            },
            isCompleted: {
              type: "boolean",
              description: "Whether the task is completed",
              example: false,
            },
            priority: {
              type: "string",
              enum: ["p1", "p2", "p3"],
              description:
                "Priority level of the task (p1: High, p2: Medium, p3: Low)",
              example: "p2",
            },
            createdAt: {
              type: "string",
              format: "date-time",
              description: "Task creation timestamp",
              example: "2023-12-07T10:30:00.000Z",
            },
            updatedAt: {
              type: "string",
              format: "date-time",
              description: "Task last update timestamp",
              example: "2023-12-07T10:30:00.000Z",
            },
          },
        },
      },
      responses: {
        NotFound: {
          description: "Resource not found",
          content: {
            "application/json": {
              schema: {
                $ref: "#/components/schemas/Error",
              },
            },
          },
        },
        ValidationError: {
          description: "Validation error",
          content: {
            "application/json": {
              schema: {
                $ref: "#/components/schemas/Error",
              },
            },
          },
        },
        ServerError: {
          description: "Internal server error",
          content: {
            "application/json": {
              schema: {
                $ref: "#/components/schemas/Error",
              },
            },
          },
        },
      },
    },
  },
  apis: [
    path.join(__dirname, "../routes/*.ts"),
    path.join(__dirname, "../controllers/*.ts"),
    path.join(__dirname, "../index.ts"),
  ],
};

const specs = swaggerJSDoc(options);

export function setupSwagger(app: Express) {
  app.use(
    "/api-docs",
    swaggerUi.serve,
    swaggerUi.setup(specs, {
      customCss: ".swagger-ui .topbar { display: none }",
      customSiteTitle: "Todo List API Documentation",
    })
  );
}

export { specs, swaggerUi };
