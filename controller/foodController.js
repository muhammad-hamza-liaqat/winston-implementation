const foodModel = require("../models/foodModel");
const multer = require("multer");
const path = require("path");

// multer configturation
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, "../uploads/foodImages"));
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});
const upload = multer({ storage: storage }).single("foodImage");

const handleFileUpload = (req, res, next) => {
  upload(req, res, function (err) {
    if (err instanceof multer.MulterError) {
      return res.json({
        message: "File upload error. Please upload the file in PDF format only",
      });
    } else if (err) {
      return res.sendError({ message: "Internal server error" }, 500);
    }
    next();
  });
};

const addFood = async (req, res) => {
  const { foodName, foodPrice, foodDescription, foodImage } = req.body;
  if (!foodName || !foodPrice || !foodDescription) {
    return res.status(400).json({ message: "all fields required" });
  }
  if (!req.file) {
    return res.status(400).json({ message: "Food image is required!" });
  }
  try {
    const newFood = await foodModel.create({
      foodName,
      foodPrice,
      foodImage: req.file.originalname,
      foodDescription,
    });
    console.log(newFood);
    await newFood.save();
    console.log("food saved=>", newFood);
    return res.status(201).json({ message: "food added successfully!", food:newFood });
  } catch (error) {
    console.error("error=>", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

module.exports = { addFood, handleFileUpload };
