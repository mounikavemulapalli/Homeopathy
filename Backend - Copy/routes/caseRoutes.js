/** @format */

const express = require("express");
const router = express.Router();
const multer = require("multer");
const path = require("path");
const fs = require("fs");
const Case = require("../models/Case");

// Ensure upload directory exists
const uploadDir = "uploads";
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir);
}

// Multer setup
const storage = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, uploadDir);
  },
  filename(req, file, cb) {
    const ext = path.extname(file.originalname);
    cb(null, `${file.fieldname}-${Date.now()}${ext}`);
  },
});

const upload = multer({
  storage,
  fileFilter(req, file, cb) {
    const ext = path.extname(file.originalname).toLowerCase();
    if (![".jpg", ".jpeg", ".png"].includes(ext)) {
      return cb(new Error("Only images are allowed"));
    }
    cb(null, true);
  },
});

// @route   POST /api/cases
// @desc    Submit new case with image and chief complaint images
router.post("/", upload.any(), async (req, res) => {
  try {
    // Parse and validate input data
    if (!req.body.data) {
      return res.status(400).json({ message: "Missing data field" });
    }

    const data = JSON.parse(req.body.data);
    if (!Array.isArray(data.chiefComplaints)) {
      data.chiefComplaints = [];
    }

    // Initialize image fields
    data.imageUrl = "";
    data.chiefComplaints = data.chiefComplaints.map((c) => ({
      ...c,
      skinImageUrl: "",
    }));

    // Process all uploaded files
    (req.files || []).forEach((file) => {
      if (file.fieldname === "image") {
        data.imageUrl = `/uploads/${file.filename}`;
      } else {
        const match = file.fieldname.match(/chiefComplaints\[(\d+)\]\[skinImage\]/);
        if (match) {
          const index = parseInt(match[1], 10);
          if (data.chiefComplaints[index]) {
            data.chiefComplaints[index].skinImageUrl = `/uploads/${file.filename}`;
          }
        }
      }
    });

    // Save to MongoDB
    const newCase = new Case(data);
    await newCase.save();

    res.status(201).json({ message: "Case submitted", case: newCase });
  } catch (error) {
    console.error("Error saving case:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

// @route   GET /api/cases
router.get("/", async (req, res) => {
  try {
    const cases = await Case.find();
    res.json(cases);
  } catch (error) {
    console.error("Error fetching cases:", error);
    res.status(500).json({ message: "Server error" });
  }
});

// @route   PUT /api/cases/:id
router.put("/:id", async (req, res) => {
  try {
    const updated = await Case.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    );
    res.json(updated);
  } catch (err) {
    console.error("Error updating case:", err);
    res.status(500).json({ error: "Update failed" });
  }
});

// @route   DELETE /api/cases/:id
router.delete("/:id", async (req, res) => {
  try {
    await Case.findByIdAndDelete(req.params.id);
    res.json({ success: true });
  } catch (err) {
    console.error("Error deleting case:", err);
    res.status(500).json({ error: "Delete failed" });
  }
});

module.exports = router;
