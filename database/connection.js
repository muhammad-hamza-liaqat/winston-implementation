const mongoose = require("mongoose");
const db = process.env.DB
mongoose
  .connect("mongodb://localhost:27017/carReview")
  .then(() => {
    console.log("server connected to DB");
  })
  .catch((error) => {
    console.log("server not connected to DB",error);
  });

module.exports = mongoose