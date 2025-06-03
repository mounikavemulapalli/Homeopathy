/** @format */

const express = require("express");
const router = express.Router();
const {
  createCase,
  getAllCases,
  getCaseById,
  updateCase,
} = require("../controllers/caseController");

router.post("/", createCase);
router.get("/", getAllCases);
router.get("/:id", getCaseById);
router.put("/:id", updateCase);

module.exports = router;
