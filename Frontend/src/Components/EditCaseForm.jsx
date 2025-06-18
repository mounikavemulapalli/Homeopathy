import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

function EditCaseForm() {
  const { caseId } = useParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    symptoms: '',
    remedyGiven: '',
    dateOfVisit: '',
    chiefComplaints: [
      { complaint: '', duration: '', description: '' }
    ],
    prescriptions: [
      { date: '', remedyName: '', potency: '', dose: '', instructions: '' }
    ]
  });

  useEffect(() => {
    axios
      .get(`http://localhost:5000/api/cases/${caseId}`)
      .then((res) => {
        const data = res.data;
        setFormData({
          ...data,
          chiefComplaints: data.chiefComplaints?.length
            ? data.chiefComplaints
            : [{ complaint: '', duration: '', description: '' }],
          prescriptions: data.prescriptions?.length
            ? data.prescriptions
            : [{ date: '', remedyName: '', potency: '', dose: '', instructions: '' }]
        });
      })
      .catch((err) => console.error('Failed to fetch case data:', err));
  }, [caseId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleComplaintChange = (index, e) => {
    const { name, value } = e.target;
    const updated = [...formData.chiefComplaints];
    updated[index][name] = value;
    setFormData((prev) => ({ ...prev, chiefComplaints: updated }));
  };

  const addComplaint = () => {
    setFormData((prev) => ({
      ...prev,
      chiefComplaints: [...prev.chiefComplaints, { complaint: '', duration: '', description: '' }]
    }));
  };

  const removeComplaint = (index) => {
    const updated = [...formData.chiefComplaints];
    updated.splice(index, 1);
    setFormData((prev) => ({ ...prev, chiefComplaints: updated }));
  };

  const handlePrescriptionChange = (index, e) => {
    const { name, value } = e.target;
    const updated = [...formData.prescriptions];
    updated[index][name] = value;
    setFormData((prev) => ({ ...prev, prescriptions: updated }));
  };

  const addPrescription = () => {
    setFormData((prev) => ({
      ...prev,
      prescriptions: [...prev.prescriptions, { date: '', remedyName: '', potency: '', dose: '', instructions: '' }]
    }));
  };

  const removePrescription = (index) => {
    const updated = [...formData.prescriptions];
    updated.splice(index, 1);
    setFormData((prev) => ({ ...prev, prescriptions: updated }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .put(`http://localhost:5000/api/cases/${caseId}`, formData)
      .then(() => {
        alert('Case updated successfully');
        navigate('/followups');
      })
      .catch((err) => {
        console.error('Error updating case:', err);
      });
  };

  return (
    <div className="container mt-4">
      <h2>Edit Case</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label">Patient Name</label>
          <input
  type="text"
  className="form-control"
  name="name"                // ✅ updated
  value={formData.name}      // ✅ updated
  onChange={handleChange}
/>
        </div>

        <div className="mb-3">
          <label className="form-label">Phone Number</label>
          <input
  type="text"
  className="form-control"
  name="phone"               // ✅ updated
  value={formData.phone}     // ✅ updated
  onChange={handleChange}
/>
        </div>

        <div className="mb-3">
          <label className="form-label">Symptoms</label>
          <textarea
            className="form-control"
            name="symptoms"
            value={formData.symptoms}
            onChange={handleChange}
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Remedy Given</label>
          <input
            type="text"
            className="form-control"
            name="remedyGiven"
            value={formData.remedyGiven}
            onChange={handleChange}
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Date of Visit</label>
          <input
            type="date"
            className="form-control"
            name="dateOfVisit"
            value={formData.dateOfVisit?.substring(0, 10)}
            onChange={handleChange}
          />
        </div>

        <hr />
        <h4>Chief Complaints</h4>
        {formData.chiefComplaints.map((cc, index) => (
          <div key={index} className="border p-3 mb-3">
            <input
              className="form-control mb-2"
              placeholder="Complaint"
              name="complaint"
              value={cc.complaint}
              onChange={(e) => handleComplaintChange(index, e)}
            />
            <input
              className="form-control mb-2"
              placeholder="Duration"
              name="duration"
              value={cc.duration}
              onChange={(e) => handleComplaintChange(index, e)}
            />
            <textarea
              className="form-control mb-2"
              placeholder="Description"
              name="description"
              value={cc.description}
              onChange={(e) => handleComplaintChange(index, e)}
            />
            <button type="button" className="btn btn-danger btn-sm" onClick={() => removeComplaint(index)}>
              Remove
            </button>
          </div>
        ))}
        <button type="button" className="btn btn-secondary mb-4" onClick={addComplaint}>
          + Add Complaint
        </button>

        <hr />
        <h4>Prescriptions</h4>
        {formData.prescriptions.map((p, index) => (
          <div key={index} className="border p-3 mb-3">
            <input
              type="date"
              className="form-control mb-2"
              name="date"
              value={p.date?.substring(0, 10)}
              onChange={(e) => handlePrescriptionChange(index, e)}
            />
            <input
              className="form-control mb-2"
              placeholder="Remedy Name"
              name="remedyName"
              value={p.remedyName}
              onChange={(e) => handlePrescriptionChange(index, e)}
            />
            <input
              className="form-control mb-2"
              placeholder="Potency"
              name="potency"
              value={p.potency}
              onChange={(e) => handlePrescriptionChange(index, e)}
            />
            <input
              className="form-control mb-2"
              placeholder="Dose"
              name="dose"
              value={p.dose}
              onChange={(e) => handlePrescriptionChange(index, e)}
            />
            <input
              className="form-control mb-2"
              placeholder="Instructions"
              name="instructions"
              value={p.instructions}
              onChange={(e) => handlePrescriptionChange(index, e)}
            />
            <button type="button" className="btn btn-danger btn-sm" onClick={() => removePrescription(index)}>
              Remove
            </button>
          </div>
        ))}
        <button type="button" className="btn btn-secondary mb-4" onClick={addPrescription}>
          + Add Prescription
        </button>

        <div className="d-grid mt-4">
          <button type="submit" className="btn btn-primary">
            Update Case
          </button>
        </div>
      </form>
    </div>
  );
}

export default EditCaseForm;
