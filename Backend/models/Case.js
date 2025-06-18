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
  patientName: String, // Add this if needed
  phoneNumber: String, // Add this if used separately
  symptoms: String, // Add this
  remedyGiven: String, // Add this
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

  prescriptions: [
    {
      date: Date,
      remedyName: String,
      potency: String,
      dose: String,
      instructions: String,
    },
  ],

  pastHistory: {
    childhoodDiseases: String,
    surgeriesInjuries: String,
    majorIllnesses: String,
  },

  // Add other sections if needed
});


module.exports = mongoose.model("Case", CaseSchema);




