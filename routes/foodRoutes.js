const express = require("express")
const foodRouter = express.Router();
const { addFood, handleFileUpload } = require("../controller/foodController")


foodRouter.route("/add")
.post(handleFileUpload,addFood);


module.exports = foodRouter