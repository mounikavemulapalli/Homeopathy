import React, { useState } from "react";

const FollowUpForm = ({ onSubmit }) => {
  const [formData, setFormData] = useState({
    patientName: "",
    date: "",
    complaint: "",
    prescription: "",
  });

  const handleChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (onSubmit) onSubmit(formData);
    alert("Follow-up saved!");
    setFormData({
      patientName: "",
      date: "",
      complaint: "",
      prescription: "",
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 max-w-2xl mx-auto p-6 bg-white shadow-md rounded-xl">
      <h2 className="text-2xl font-bold text-center mb-4">Add Follow-Up</h2>

      <input
        type="text"
        placeholder="Patient Name"
        value={formData.patientName}
        onChange={(e) => handleChange("patientName", e.target.value)}
        className="w-full p-2 border rounded"
        required
      />

      <input
        type="date"
        placeholder="Date"
        value={formData.date}
        onChange={(e) => handleChange("date", e.target.value)}
        className="w-full p-2 border rounded"
        required
      />

      <textarea
        placeholder="Complaint/Progress"
        value={formData.complaint}
        onChange={(e) => handleChange("complaint", e.target.value)}
        className="w-full p-2 border rounded"
        rows="3"
        required
      />

      <textarea
        placeholder="Prescription"
        value={formData.prescription}
        onChange={(e) => handleChange("prescription", e.target.value)}
        className="w-full p-2 border rounded"
        rows="2"
        required
      />

      <button
        type="submit"
        className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700 transition"
      >
        Save Follow-Up
      </button>
    </form>
  );
};

export default FollowUpForm;
