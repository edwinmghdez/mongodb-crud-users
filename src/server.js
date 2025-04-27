const express = require("express");
const path = require("path");
const userRoutes = require("./routes/userRoutes");
const swaggerJSDoc = require("swagger-jsdoc");
const swaggerUI = require("swagger-ui-express");
const db = require("./config/db");
const errorHandler = require("./middlewares/errorHandler");
require("dotenv").config();
const app = express();
const port = process.env.APP_PORT || 3000;

const swaggerOptions = {
  definition: {
    openapi: "3.0.0",
    info: {
      version: "1.0",
      title: process.env.APP_NAME + " API",
      description: "API for " + process.env.APP_NAME,
    },
  },
  apis: [path.join(__dirname, "./routes/*.js")],
};

const swaggerDocs = swaggerJSDoc(swaggerOptions);

app.use(express.json());

db.connect();

app.use("/api/docs", swaggerUI.serve, swaggerUI.setup(swaggerDocs));
app.use("/api/v1/users", userRoutes);

app.use(errorHandler);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

module.exports = app;
