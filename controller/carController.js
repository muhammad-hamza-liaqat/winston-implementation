const carModel = require("../models/carModel");
const getallData = async (req, res) => {
//   res.end("hello");
const result = await carModel.find({})
res.status(200).json(result)
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
