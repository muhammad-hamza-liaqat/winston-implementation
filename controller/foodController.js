const foodModel = require("../models/foodModel");
const multer = require("multer");
const path = require("path");

// multer configuration
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, "../uploads/foodImages"));
  },
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    const fileName = `foodImage_${Date.now()}${ext}`;
    cb(null, fileName);
  },
});

const fileFilter = (req, file, cb) => {
  const allowedFileTypes = /jpeg|jpg|png/;
  const ext = path.extname(file.originalname).toLowerCase();
  const isAllowed = allowedFileTypes.test(ext);
  if (isAllowed) {
    return cb(null, true);
  } else {
    cb(new Error("Only jpeg, jpg, and png files are allowed!"), false);
  }
};

const upload = multer({ storage: storage, fileFilter: fileFilter }).single(
  "foodImage"
);

const handleFileUpload = (req, res, next) => {
  upload(req, res, function (err) {
    if (err instanceof multer.MulterError) {
      return res.json({
        message:
          "File upload error. Please upload the file in JPEG, JPG, or PNG format only",
      });
    } else if (err) {
      if (err.message === "Only jpeg, jpg, and png files are allowed!") {
        return res.status(400).json({ message: err.message });
      } else {
        return res.status(500).json({ message: "Internal server error" });
      }
    }
    next();
  });
};

const addFood = async (req, res) => {
  const { foodName, foodPrice, foodDescription } = req.body;
  if (!foodName || !foodPrice || !foodDescription) {
    return res.status(400).json({ message: "All fields are required" });
  }
  if (!req.file) {
    return res.status(400).json({ message: "Food image is required!" });
  }
  try {
    const newFood = await foodModel.create({
      foodName,
      foodPrice,
      foodImage: `../uploads/foodImages/${req.file.filename}`, 
      foodDescription,
    });
    console.log(newFood);
    await newFood.save();
    console.log("food saved =>", newFood);
    return res
      .status(201)
      .json({ message: "Food added successfully!", food: newFood });
  } catch (error) {
    console.error("error =>", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

module.exports = { addFood, handleFileUpload };
