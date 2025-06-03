import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

function EditCaseForm() {
  const { caseId } = useParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    patientName: '',
    phoneNumber: '',
    symptoms: '',
    remedyGiven: '',
    followUpDate: '',
  });

  useEffect(() => {
    axios
      .get(`https://bhanuhomeo-backend.onrender.com/api/cases/${caseId}`)  // Corrected URL if needed
      .then((res) => setFormData(res.data))
      .catch((err) => console.error('Failed to fetch case data:', err));
  }, [caseId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .put(`https://bhanuhomeo-backend.onrender.com/api/cases/${caseId}`, formData)  // Corrected URL
      .then(() => {
        alert('Case updated successfully');
        navigate('/followups');  // Redirect to follow-ups page after update
      })
      .catch((err) => {
        console.error('Error updating case:', err);
      });
  };

  return (
    <div className="container mt-4">
      <h2>Edit Case</h2>
      <form onSubmit={handleSubmit}>
        {Object.entries(formData).map(([key, value]) => (
          <div className="mb-3" key={key}>
            <label className="form-label">
              {key.replace(/([A-Z])/g, ' $1').toUpperCase()}
            </label>
            <input
              type="text"
              className="form-control"
              name={key}
              value={value}
              onChange={handleChange}
            />
          </div>
        ))}
        <button type="submit" className="btn btn-primary">
          Update Case
        </button>
      </form>
    </div>
  );
}

export default EditCaseForm;
