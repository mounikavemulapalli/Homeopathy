/** @format */

import React, { useState } from "react";

const FollowUpForm = ({ onSubmit }) => {
  const [formData, setFormData] = useState({
    patientName: "",
    phoneNumber: "",
    complaint: "",
    complaints: "",
    prescription: "",
    remarks: "",
    date: "",
  });
  const [saving, setSaving] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSaving(true);
    setTimeout(() => {
      if (onSubmit) onSubmit(formData);
      setSuccess(true);
      setSaving(false);
      setFormData({
        patientName: "",
        phoneNumber: "",
        complaint: "",
        complaints: "",
        prescription: "",
        remarks: "",
        date: "",
      });
      setTimeout(() => setSuccess(false), 2000);
    }, 600);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className='space-y-5 max-w-2xl mx-auto p-6 bg-white shadow-lg rounded-xl border'
      autoComplete='off'
    >
      <h2 className='text-2xl font-bold text-center mb-4 text-blue-700'>
        Add Follow-Up
      </h2>

      <div>
        <label
          className='block font-semibold mb-1 text-gray-700'
          htmlFor='patientName'
        >
          Patient Name
        </label>
        <input
          id='patientName'
          type='text'
          placeholder='Patient Name'
          value={formData.patientName}
          onChange={(e) => handleChange("patientName", e.target.value)}
          className='w-full p-2 border rounded focus:ring-2 focus:ring-blue-300'
          required
        />
      </div>

      <div>
        <label
          className='block font-semibold mb-1 text-gray-700'
          htmlFor='phoneNumber'
        >
          Phone Number
        </label>
        <input
          id='phoneNumber'
          type='text'
          placeholder='Phone Number'
          value={formData.phoneNumber}
          onChange={(e) => handleChange("phoneNumber", e.target.value)}
          className='w-full p-2 border rounded focus:ring-2 focus:ring-blue-300'
        />
      </div>

      <div>
        <label
          className='block font-semibold mb-1 text-gray-700'
          htmlFor='complaint'
        >
          Complaint
        </label>
        <input
          id='complaint'
          type='text'
          placeholder='Complaint'
          value={formData.complaint}
          onChange={(e) => handleChange("complaint", e.target.value)}
          className='w-full p-2 border rounded focus:ring-2 focus:ring-blue-300'
        />
      </div>

      <div>
        <label
          className='block font-semibold mb-1 text-gray-700'
          htmlFor='complaints'
        >
          Complaints (if any)
        </label>
        <input
          id='complaints'
          type='text'
          placeholder='Complaints'
          value={formData.complaints}
          onChange={(e) => handleChange("complaints", e.target.value)}
          className='w-full p-2 border rounded focus:ring-2 focus:ring-blue-300'
        />
      </div>

      <div>
        <label
          className='block font-semibold mb-1 text-gray-700'
          htmlFor='prescription'
        >
          Prescription
        </label>
        <textarea
          id='prescription'
          placeholder='Prescription'
          value={formData.prescription}
          onChange={(e) => handleChange("prescription", e.target.value)}
          className='w-full p-2 border rounded focus:ring-2 focus:ring-blue-300'
          rows='2'
        />
      </div>

      <div>
        <label
          className='block font-semibold mb-1 text-gray-700'
          htmlFor='remarks'
        >
          Remarks
        </label>
        <textarea
          id='remarks'
          placeholder='Remarks'
          value={formData.remarks}
          onChange={(e) => handleChange("remarks", e.target.value)}
          className='w-full p-2 border rounded focus:ring-2 focus:ring-blue-300'
          rows='2'
        />
      </div>

      <div>
        <label
          className='block font-semibold mb-1 text-gray-700'
          htmlFor='date'
        >
          Date
        </label>
        <input
          id='date'
          type='date'
          value={formData.date}
          onChange={(e) => handleChange("date", e.target.value)}
          className='w-full p-2 border rounded focus:ring-2 focus:ring-blue-300'
          required
        />
      </div>

      <button
        type='submit'
        className='w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700 transition'
        disabled={saving}
      >
        {saving ? "Saving..." : "Save Follow-Up"}
      </button>

      {success && (
        <div className='text-green-700 text-center font-semibold mt-2'>
          Follow-up saved successfully!
        </div>
      )}
    </form>
  );
};

export default FollowUpForm;
