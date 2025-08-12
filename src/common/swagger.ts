import swaggerJSDoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";
import { Express } from "express";

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "API Documentation",
      version: "1.0.0",
      description: "A simple Express API with TypeScript",
    },
    servers: [
      {
        url: "http://13.62.111.170:3000",
        description: "Development server",
      },
    ],
  },
  apis: ["./src/routs/*.ts", "./src/controllers/*.ts"],
};

const specs = swaggerJSDoc(options);

export const setupSwagger = (app: Express): void => {
  app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(specs));
  console.log(`Swagger UI available at ${options.definition.servers[0].url}/api-docs`);
};

export default specs;
