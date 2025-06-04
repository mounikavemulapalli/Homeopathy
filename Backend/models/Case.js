/** @format */

// const caseSchema = new mongoose.Schema({
//   name: String,
//   age: Number,
//   gender: String,
//   phone: String,
//   dateOfVisit: Date,
//   chiefComplaints: [
//     {
//       complaint: String,
//       duration: String,
//       description: String,
//     }
//   ],
//   // Add other fields as needed similarly...
//   createdAt: {
//     type: Date,
//     default: Date.now,
//   },
// });
const mongoose = require("mongoose");

const chiefComplaintSchema = new mongoose.Schema({
  complaint: String,
  duration: String,
  description: String,
});

const prescriptionSchema = new mongoose.Schema({
  date: Date,
  remedyName: String,
  potency: String,
  dose: String,
  instructions: String,
});

const pastHistorySchema = new mongoose.Schema({
  childhoodDiseases: String,
  surgeriesInjuries: String,
  majorIllnesses: String,
});

const personalHistorySchema = new mongoose.Schema({
  appetite: String,
  cravingsAversions: String,
  thirst: String,
  bowel: String,
  urine: String,
  sleep: String,
  dreams: String,
  sweat: String,
  thermal: String,
  habits: String,
  menstrual: String,
});

const caseSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    age: String,
    gender: String,
    maritalStatus: String,
    occupation: String,
    address: String,
    phone: String,
    dateOfVisit: Date,
    chiefComplaints: [chiefComplaintSchema],
    historyPresentIllness: String,
    pastHistory: pastHistorySchema,
    familyHistory: String,
    personalHistory: personalHistorySchema,
    mentalSymptoms: String,
    generalRemarks: String,
    observationsByDoctor: String,
    prescription: [prescriptionSchema],
    imageUrl: String, // store the image path or URL
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Case", caseSchema);
