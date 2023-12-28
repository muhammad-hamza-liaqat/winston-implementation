const mongoose = require("mongoose");

let carSchema = new mongoose.Schema({
  model: {
    type: String,
    required: true,
  },
  overall_rating: {
    type: Number,
    required: true,
  },
  date: {
    type: Date,
    default: null, // or set a default value if needed
  },
  review: {
    type: String,
    required: true,
  },
  style: {
    type: Number,
    required: true,
  },
  comfort: {
    type: Number,
    required: true,
  },
  fuel_economy: {
    type: Number,
    required: true,
  },
  performance: {
    type: Number,
    required: true,
  },
  value_for_money: {
    type: Number,
    required: true,
  },
});
carSchema.index({ model: 'text', brand: 'text' });

let CarModel = mongoose.model('cars', carSchema); 

module.exports = CarModel;
