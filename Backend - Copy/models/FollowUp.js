/** @format */

const mongoose = require("mongoose");

const followUpSchema = new mongoose.Schema({
  patientId: String,
  patientName: String,
  phoneNumber: String, // <-- add this
  date: String, // YYYY-MM-DD
  complaint: String,
  complaints: String,
  prescription: String,
  remarks: String,
  // Add other fields as needed
});

module.exports = mongoose.model("FollowUp", followUpSchema);
