const userModel = require("../models/userModel");
const registerUser = async (req, res) => {
  // res.end("hello")
  const { userName, userEmail, phoneNumber, password, cnic } = req.body;
  if (!userName || !userEmail || !phoneNumber || !password || !cnic) {
    return res.status(400).json({ message: "all fields are required!" });
  }
  try {
    const newUser = await userModel.create({ ...req.body });
    await newUser.save();
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
