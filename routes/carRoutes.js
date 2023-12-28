const express = require("express");
const carRoute = express.Router();
const { getallData} = require("../controller/carController")
carRoute.route("/all")
.get(getallData);



module.exports= carRoute