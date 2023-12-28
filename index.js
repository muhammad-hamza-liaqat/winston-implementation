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

// server
app.listen(process.env.port, () => {
  console.log(`server running at localhost:${process.env.port}/`);
});
