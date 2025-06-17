/** @format */

const Case = require("../models/Case");

// POST: Create Case
exports.createCase = async (req, res) => {
  try {
    const newCase = new Case(req.body);
    await newCase.save();
    res.status(201).json(newCase);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// GET: All Cases
exports.getAllCases = async (req, res) => {
  try {
    const cases = await Case.find();
    res.status(200).json(cases);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// GET: Single Case
exports.getCaseById = async (req, res) => {
  try {
    const singleCase = await Case.findById(req.params.id);
    if (!singleCase) return res.status(404).json({ error: "Not found" });
    res.json(singleCase);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// PUT: Update Case
exports.updateCase = async (req, res) => {
  try {
    const updated = await Case.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    res.json(updated);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
