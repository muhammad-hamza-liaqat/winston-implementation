const express = require("express");
const carRoute = express.Router();
const { getallData, addCar } = require("../controller/carController");

carRoute.route("/all").get(getallData);
carRoute.route("/add").post(addCar);

module.exports = carRoute;
