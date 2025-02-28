const express = require("express");
const morgan = require("morgan");
const mysql = require("mysql2");
const myConnection = require("express-myconnection");
const path = require("path");
const swaggerUi = require("swagger-ui-express");
const swaggerSpec = require("./swagger");
const app = express();
require("dotenv").config();

// Importing routes
const customerRoutes = require("./routes/customer");

// settings
app.set("port", process.env.PORT || 3000);

// Database configuration
const dbConfig = {
  host: "centerbeam.proxy.rlwy.net",
  user: "root",
  password: "bmaUzIqlfELNwfxZdXKYeElxKoRPUZPs",
  port: "51420",
  database: "railway",
};

// Function to create database connection
const createConnection = () => {
  return mysql.createConnection(dbConfig);
};

// Function to handle database connection with retry mechanism
const connectWithRetry = (retries = 5, delay = 5000) => {
  const connection = createConnection();

  connection.connect((err) => {
    if (err) {
      console.error("Lỗi kết nối database:", err);
      if (retries > 0) {
        console.log(
          `Thử kết nối lại sau ${delay / 1000} giây... (còn ${retries} lần thử)`
        );
        setTimeout(() => connectWithRetry(retries - 1, delay), delay);
      } else {
        console.error("Đã hết số lần thử kết nối database.");
        process.exit(1);
      }
      return;
    }
    console.log("Kết nối database thành công!");
  });

  connection.on("error", (err) => {
    console.error("Lỗi database:", err);
    if (err.code === "PROTOCOL_CONNECTION_LOST") {
      console.log("Mất kết nối database. Đang thử kết nối lại...");
      connectWithRetry();
    } else {
      throw err;
    }
  });
};

// middlewares
app.use(morgan("dev"));

// Try to connect to database with retry mechanism
try {
  app.use(myConnection(mysql, dbConfig, "single"));
  connectWithRetry();
} catch (error) {
  console.error("Lỗi khởi tạo kết nối database:", error);
  process.exit(1);
}

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// Error handling middleware
app.use((err, req, res, next) => {
  console.error("Lỗi server:", err);
  res.status(500).json({
    error: true,
    message: "Lỗi server",
    details: process.env.NODE_ENV === "development" ? err.message : undefined,
  });
});

// CORS middleware
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
  next();
});

// Swagger documentation
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Routes
app.use("/api", customerRoutes);

// Starting the server
app.listen(app.get("port"), () => {
  console.log("Server on port 3000");
  console.log(
    "Swagger documentation available at http://localhost:3000/api-docs"
  );
});
