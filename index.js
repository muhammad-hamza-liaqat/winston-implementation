const express = require("express");
const app = express();
const cors = require("cors");
// sensitive information
require("dotenv").config();
// database connection
require("./database/connection");
// middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// routes import
const car = require("./routes/carRoutes");
const food = require("./routes/foodRoutes");
const user = require("./routes/userRoutes");

app.use("/api/car", car);
app.use("/api/food", food);
app.use("/api/user", user);

// server
app.listen(process.env.port, () => {
  console.log(`server running at localhost:${process.env.port}/`);
});
