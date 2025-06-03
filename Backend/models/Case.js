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
const mongoose = require('mongoose');

// Sub-schema for follow-ups
const followUpSchema = new mongoose.Schema({
  date: Date,
  notes: String
}, { _id: false });

// Main case schema
const caseSchema = new mongoose.Schema({
  patientName: { type: String, required: true },
  phoneNumber: { type: String, required: true },
  visitDate: {
    type: Date,
    default: Date.now
  },
  symptoms: { type: String, required: true },
  mentalSymptoms: String,
  remedyGiven: String,
  followUpDate: Date,
  faceAnalysis: Object,          // ✅ NEW: stores AI analysis result
  followUps: [followUpSchema]    // ✅ supports multiple follow-ups
});

module.exports = mongoose.model('Case', caseSchema);