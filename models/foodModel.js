const mongoose = require("mongoose");

let foodSchema = new mongoose.Schema({
  foodName: {
    type: String,
    required: true,
  },
  foodPrice: {
    type: Number,
    required: true,
  },
  foodDescription: {
    type: String,
    required: true,
  },
  foodImage: {
    type: String,
    required: true,
  },
});

let foodModel = mongoose.model("foods", foodSchema);

module.exports = foodModel;
