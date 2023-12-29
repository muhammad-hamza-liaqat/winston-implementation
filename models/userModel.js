const mongoose = require("mongoose");

function validateUserName(value) {
  return /^[a-zA-Z ]+$/.test(value);
}
function validateUserEmail(value) {
  return /^[a-zA-Z0-9._%+-]+@(gmail\.com|icloud\.com)$/.test(value);
}

let userSchema = new mongoose.Schema({
  userName: {
    type: String,
    required: true,
    validate: [
      validateUserName,
      "enter only alphabets. numeric words are not allowed",
    ],
  },
  userEmail: {
    type: String,
    required: true,
    unique: true,
    caseInsensitive: true,
    validate: [validateUserEmail, "Invalid email."],
  },
  phoneNumber: {
    type: Number,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  cnic: {
    type: String,
    required: true,
    unique: true,
  },
});

const userModel = mongoose.model("users", userSchema);
module.exports = userModel;
