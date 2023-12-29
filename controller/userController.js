const userModel = require("../models/userModel");
const registerUser = async (req, res) => {
  if (
    !req.body.userName ||
    !req.body.userEmail ||
    !req.body.password ||
    !req.body.password ||
    !req.body.cnic ||
    !req.body.phoneNumber
  ) {
    return res.status(400).json({ message: "all fields are required" });
  }
  try {
    const newUser = await userModel.create({ ...req.body });
    if (newUser) {
      console.log("user saved successfully!");
      return res
        .status(201)
        .json({ message: "user saved successfully!", user: newUser });
    }
  } catch (error) {
    console.error("error->", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

module.exports = { registerUser };
