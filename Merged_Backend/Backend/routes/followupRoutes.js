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
  const { id } = req.params;
  try {
    const updated = await db.collection("followups").findOneAndUpdate(
      { _id: new ObjectId(id) },
      { $set: req.body },
      { returnDocument: "after" }
    );
    res.json(updated.value);
  } catch (err) {
    res.status(500).json({ error: "Update failed" });
  }
});

// DELETE: Delete follow-up
router.delete("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    await db.collection("followups").deleteOne({ _id: new ObjectId(id) });
    res.json({ message: "Deleted" });
  } catch (err) {
    res.status(500).json({ error: "Delete failed" });
  }
});
// Optionally: delete, update, etc.

module.exports = router;
