const swaggerJSDoc = require("swagger-jsdoc");

const swaggerDefinition = {
  openapi: "3.0.0",
  info: {
    title: "Node.js MySQL CRUD API",
    version: "1.0.0",
    description: "API documentation for Node.js MySQL CRUD application",
  },
  servers: [
    {
      url: "http://localhost:3000",
      description: "Development server",
    },
  ],
};

const options = {
  swaggerDefinition,
  apis: ["./src/routes/*.js"], // Đường dẫn tới các file chứa routes
};

const swaggerSpec = swaggerJSDoc(options);

module.exports = swaggerSpec;
