const mongoose = require("mongoose");

let carModel = new mongoose.Schema({
  model: {
    type: String,
  },
  overall_rating: {
    type: Number,
  },
  date: {
    type: Date,
  },
  review: {
    type: String,
  },
  style: {
    type: Number,
  },
  confort: {
    type: Number,
  },
  fuel_economy: {
    type: Number,
  },
  performance: {
    type: Number,
  },
  value_for_money: {
    type: Number,
  },
});

module.exports = carModel
