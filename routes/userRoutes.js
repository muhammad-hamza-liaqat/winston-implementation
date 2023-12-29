const express = require("express");
const userRoute = express.Router();
const { registerUser, login } = require("../controller/userController");
userRoute.route("/register").post(registerUser);
userRoute.route("/login").post(login);

module.exports = userRoute;
