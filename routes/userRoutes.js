const express = require("express");
const userRoute = express.Router();
const { registerUser} = require("../controller/userController");
userRoute.route("/register").post(registerUser);


module.exports = userRoute