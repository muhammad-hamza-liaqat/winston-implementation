const carModel = require("../models/carModel");
const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate-v2');

const getallData = async (req, res) => {
  try {
    const { page = 1, limit = 10, model } = req.query;

    // Build the filter object based on the "model" parameter
    const filter = model ? { model: { $regex: new RegExp(model, 'i') } } : {};

    const result = await carModel
      .find(filter)
      .skip((page - 1) * limit)
      .limit(Number(limit));

    const totalCount = await carModel.countDocuments(filter);

    res.status(200).json({
      message: 'data fetched',
      data: result,
      pagination: {
        page: Number(page),
        limit: Number(limit),
        total: totalCount,
        totalPages: Math.ceil(totalCount / limit),
      },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};




const addCar = async (req, res) => {
  const {
    model,
    overall_rating,
    date,
    review,
    style,
    comfort,
    fuel_economy,
    performance,
    value_for_money,
  } = req.body;
  try {
    if (
      !model ||
      !overall_rating ||
      !review ||
      !style ||
      !comfort ||
      !fuel_economy ||
      !performance ||
      !value_for_money
    ) {
      return res.status(400).json({ message: "all fields are required!" });
    }

    let newCarAdded = await carModel.create({
      ...req.body,
    });
    const result = await newCarAdded.save();
    if (!newCarAdded) {
      return res.status(400).json({ message: "car is not added!" });
    }
    console.log(newCarAdded);
    return res.status(201).json({ message: "car added successfully!" });
  } catch (error) {
    console.log("Internal Server Error", error);
  }
};

module.exports = { getallData, addCar };
