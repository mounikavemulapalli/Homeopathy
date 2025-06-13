/** @format */

const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const path = require("path");
const followupRoutes = require("./routes/followupRoutes");
// Import your DB connection and routers
const connectDB = require("./config/db");
const caseRoutes = require("./routes/caseRoutes");
const gptRoutes = require("./routes/gpt");
const patientRoutes = require("./routes/patientRoutes");

dotenv.config();
connectDB();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "http://localhost:3000",
      "http://localhost:5000",
      // Add your deployed frontend URLs here if needed
    ],
  })
);
app.use(express.json());
app.use("/uploads", express.static(path.join(__dirname, "/uploads")));

app.get("/", (req, res) => {
  res.send("Hello from Bhanu CaseSheet backend");
});
app.use("/api/patients", patientRoutes);
app.use("/api/cases", caseRoutes);
app.use("/api/submit-case", caseRoutes);
app.use("/api/generate-summary", gptRoutes);
app.use("/api/followups", followupRoutes);
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
