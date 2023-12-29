const userModel = require("../models/userModel");
const bcrypt = require("bcrypt");
const registerUser = async (req, res) => {
  try {
    const { userName, userEmail, phoneNumber, password, cnic } = req.body;
    if (!userName || !userEmail || !password || !cnic || !phoneNumber) {
      return res.status(400).json({ message: "all fields are required" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    // console.log(hashedPassword)
    const newUser = await userModel.create({
      ...req.body,
      password: hashedPassword,
    });
    console.log(newUser)
    return res
      .status(201)
      .json({ message: "user created successfully!", user: newUser });
  } catch (error) {
    console.error("error->", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

module.exports = { registerUser };
