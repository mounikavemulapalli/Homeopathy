/** @format */

const express = require("express");
const router = express.Router();
const FollowUp = require("../models/FollowUp"); // You need to create this model

// Get today's follow-ups
router.get("/today", async (req, res) => {
  const today = new Date().toISOString().slice(0, 10);
  try {
    const followUps = await FollowUp.find({ date: today });
    res.json(followUps);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Add a new follow-up
router.post("/", async (req, res) => {
  try {
    const followUp = new FollowUp(req.body);
    await followUp.save();
    res.status(201).json(followUp);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});
// In followupRoutes.js
router.get("/", async (req, res) => {
  try {
    const followUps = await FollowUp.find();
    res.json(followUps);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});
router.put("/:id", async (req, res) => {
  try {
    const updated = await FollowUp.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    res.json(updated);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Delete a follow-up
router.delete("/:id", async (req, res) => {
  try {
    await FollowUp.findByIdAndDelete(req.params.id);
    res.json({ message: "Deleted" });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Optionally: delete, update, etc.

module.exports = router;
