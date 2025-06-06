/** @format */

const express = require("express");
const router = express.Router();

// Dummy data for now. Replace with DB logic as needed.
const patients = [
  { id: "P001", name: "Ravi Kumar" },
  { id: "P002", name: "Sita Devi" },
  // Add more or fetch from DB
];

router.get("/", (req, res) => {
  res.json(patients);
});

module.exports = router;
