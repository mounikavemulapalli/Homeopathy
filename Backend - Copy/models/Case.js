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
  modalities: String, // Added modalities field
  skinImage: String, // Added skinImage field for file path
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


const CaseSchema = new mongoose.Schema({
  name: String,
  age: Number,
  gender: String,
  phone: String,
  dateOfVisit: Date,
  imageUrl: String,
  chiefComplaints: [
    {
      complaint: String,
      duration: String,
      description: String,
      skinImageUrl: String,
    },
  ],
  pastHistory: {
    childhoodDiseases: String,
    surgeriesInjuries: String,
    majorIllnesses: String,
  },
  // Add other nested fields (e.g., presentIllness, familyHistory, etc.)
});

module.exports = mongoose.model("Case", CaseSchema);




