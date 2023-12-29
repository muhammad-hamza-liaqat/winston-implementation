const express = require("express");
const userRoute = express.Router();
const { registerUser} = require("../controller/userController");
userRoute.route("/register").get(registerUser);


module.exports = userRoute