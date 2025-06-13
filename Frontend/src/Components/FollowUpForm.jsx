/** @format */

/** @format */

import React, { useState, useEffect } from "react";

const FollowUpForm = ({ onSubmit, cases = [], initialData }) => {
  const [formData, setFormData] = useState({
    casesId: "",
    patientName: "",
    phoneNumber: "",
    complaint: "",
    prescription: "",
    remarks: "",
    date: new Date().toISOString().slice(0, 10),
  });
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (initialData) {
      setFormData({ ...initialData });
    }
  }, [initialData]);

  const handleCaseChange = (e) => {
    const selected = cases.find((c) => c._id === e.target.value);
    if (selected) {
      setFormData((prev) => ({
        ...prev,
        casesId: selected._id,
        patientName: selected.name || "",
        phoneNumber: selected.phone || "",
      }));
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    await onSubmit(formData);
    setSaving(false);
    setFormData({
      casesId: "",
      patientName: "",
      phoneNumber: "",
      complaint: "",
      prescription: "",
      remarks: "",
      date: new Date().toISOString().slice(0, 10),
    });
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-xl mx-auto p-4 bg-white shadow rounded">
      <h2 className="text-2xl font-bold mb-4">
        {initialData ? "Edit Follow-Up" : "Add Follow-Up"}
      </h2>

      <label>Patient Case:</label>
      <select name="casesId" onChange={handleCaseChange} value={formData.casesId} required>
        <option value="">-- Select a Case --</option>
        {cases.map((c) => (
          <option key={c._id} value={c._id}>
            {c.name} ({c.phone})
          </option>
        ))}
      </select>

      <label>Patient Name:</label>
      <input name="patientName" value={formData.patientName} onChange={handleChange} required />

      <label>Phone Number:</label>
      <input name="phoneNumber" value={formData.phoneNumber} onChange={handleChange} />

      <label>Complaint:</label>
      <input name="complaint" value={formData.complaint} onChange={handleChange} />

      <label>Prescription:</label>
      <textarea name="prescription" value={formData.prescription} onChange={handleChange} />

      <label>Remarks:</label>
      <textarea name="remarks" value={formData.remarks} onChange={handleChange} />

      <label>Date:</label>
      <input type="date" name="date" value={formData.date} onChange={handleChange} required />

      <button type="submit" disabled={saving} className="bg-blue-600 text-white p-2 rounded mt-3">
        {saving ? "Saving..." : initialData ? "Update" : "Save"}
      </button>
    </form>
  );
};

export default FollowUpForm;
