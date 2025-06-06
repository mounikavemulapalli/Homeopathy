/** @format */

import React, { useState } from "react";
import "./casestyles.css";

const initialCaseData = {
  name: "",
  age: "",
  gender: "",
  maritalStatus: "",
  occupation: "",
  address: "",
  phone: "",
  dateOfVisit: "",
  chiefComplaints: [{ complaint: "", duration: "", description: "" }],
  historyPresentIllness: "",
  pastHistory: {
    childhoodDiseases: "",
    surgeriesInjuries: "",
    majorIllnesses: "",
  },
  familyHistory: "",
  personalHistory: {
    appetite: "",
    cravingsAversions: "",
    thirst: "",
    bowel: "",
    urine: "",
    sleep: "",
    dreams: "",
    sweat: "",
    thermal: "",
    habits: "",
    menstrual: "",
  },
  mentalSymptoms: "",
  generalRemarks: "",
  observationsByDoctor: "",
  prescription: [
    { date: "", remedyName: "", potency: "", dose: "", instructions: "" },
  ],
  image: null,
};

const CaseSheetForm = () => {
  const [submittedData, setSubmittedData] = useState(null);
  const [caseData, setCaseData] = useState(initialCaseData);
  const [aiSummary, setAiSummary] = useState("");
  const [loadingSummary, setLoadingSummary] = useState(false);
  const [focusedInput, setFocusedInput] = useState(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCaseData({ ...caseData, [name]: value });
  };

  const handleChiefComplaintChange = (index, e) => {
    const { name, value } = e.target;
    const updatedComplaints = [...caseData.chiefComplaints];
    updatedComplaints[index][name] = value;
    setCaseData({ ...caseData, chiefComplaints: updatedComplaints });
  };

  const addChiefComplaint = () => {
    setCaseData({
      ...caseData,
      chiefComplaints: [
        ...caseData.chiefComplaints,
        { complaint: "", duration: "", description: "" },
      ],
    });
  };

  const handlePrescriptionChange = (index, e) => {
    const { name, value } = e.target;
    const updatedPrescriptions = [...caseData.prescription];
    updatedPrescriptions[index][name] = value;
    setCaseData({ ...caseData, prescription: updatedPrescriptions });
  };

  const addPrescription = () => {
    setCaseData({
      ...caseData,
      prescription: [
        ...caseData.prescription,
        { date: "", remedyName: "", potency: "", dose: "", instructions: "" },
      ],
    });
  };

  const handleImageUpload = (e) => {
    setCaseData({ ...caseData, image: e.target.files[0] });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("image", caseData.image);
    formData.append("data", JSON.stringify({ ...caseData, image: undefined }));

    try {
      const response = await fetch("http://localhost:5000/api/cases", {
        method: "POST",
        body: formData,
      });

      const result = await response.json();
      if (response.ok) {
        alert("Case submitted successfully!");
        setSubmittedData(caseData);
        setCaseData({ ...initialCaseData });
      } else {
        alert("Failed to submit case.");
      }
    } catch (error) {
      alert("Error while submitting case.");
    }
  };

  const getBase64 = (file) =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result.split(",")[1]);
      reader.onerror = (error) => reject(error);
    });

  const generateSummary = async () => {
    setLoadingSummary(true);
    setAiSummary("");

    let imageBase64 = null;
    if (caseData.image) {
      imageBase64 = await getBase64(caseData.image);
    }

    try {
      const response = await fetch(
        "http://localhost:5000/api/generate-summary",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ ...caseData, imageBase64 }),
        }
      );

      if (response.status === 429) {
        alert(
          "You have exceeded your Gemini AI API quota. Please check your billing settings."
        );
        setLoadingSummary(false);
        return;
      }

      const data = await response.json();

      if (response.ok) {
        setAiSummary(data.summary);
      } else {
        alert(data.message || "Failed to generate summary");
      }
    } catch (error) {
      alert("An unexpected error occurred while generating summary.");
    }

    setLoadingSummary(false);
  };

  return (
    <form className='case-container' onSubmit={handleSubmit}>
      <h2 style={{ textAlign: "center", marginBottom: 25 }}>Case Sheet</h2>

      {/* Image Upload */}
      <div className='case-section'>
        <label className='case-file-input-label'>Upload Face Image:</label>
        <input type='file' accept='image/*' onChange={handleImageUpload} />
        <p style={{ fontSize: 12, color: "#555" }}>
          {caseData.image ? caseData.image.name : "No file chosen"}
        </p>
      </div>

      {/* Basic Info */}
      <section className='case-section'>
        <h3 className='case-section-title'>1. Basic Patient Information</h3>
        <div className='case-form-row'>
          <div className='case-form-group'>
            <label className='case-label'>Name</label>
            <input
              className='case-input'
              name='name'
              value={caseData.name}
              onChange={handleInputChange}
              placeholder='Enter full name'
              required
            />
          </div>
          <div className='case-form-group'>
            <label className='case-label'>Age</label>
            <input
              className='case-input'
              name='age'
              value={caseData.age}
              onChange={handleInputChange}
              placeholder='Age'
              type='number'
              min={0}
              required
            />
          </div>
          <div className='case-form-group'>
            <label className='case-label'>Gender</label>
            <input
              className='case-input'
              name='gender'
              value={caseData.gender}
              onChange={handleInputChange}
              placeholder='Gender'
              required
            />
          </div>
        </div>

        <div className='case-form-row'>
          <div className='case-form-group'>
            <label className='case-label'>Marital Status</label>
            <input
              className='case-input'
              name='maritalStatus'
              value={caseData.maritalStatus}
              onChange={handleInputChange}
              placeholder='Single/Married/etc.'
            />
          </div>
          <div className='case-form-group'>
            <label className='case-label'>Occupation</label>
            <input
              className='case-input'
              name='occupation'
              value={caseData.occupation}
              onChange={handleInputChange}
              placeholder='Occupation'
            />
          </div>
        </div>

        <div className='case-form-row'>
          <div className='case-form-group' style={{ flex: "2 1 100%" }}>
            <label className='case-label'>Address</label>
            <input
              className='case-input'
              name='address'
              value={caseData.address}
              onChange={handleInputChange}
              placeholder='Address'
            />
          </div>
        </div>

        <div className='case-form-row'>
          <div className='case-form-group'>
            <label className='case-label'>Phone / WhatsApp</label>
            <input
              className='case-input'
              name='phone'
              value={caseData.phone}
              onChange={handleInputChange}
              placeholder='Phone number'
            />
          </div>
          <div className='case-form-group'>
            <label className='case-label'>Date of Visit</label>
            <input
              type='date'
              className='case-input'
              name='dateOfVisit'
              value={caseData.dateOfVisit}
              onChange={handleInputChange}
            />
          </div>
        </div>
      </section>

      {/* Chief Complaints */}
      <section className='case-section'>
        <h3 className='case-section-title'>2. Chief Complaints</h3>
        {caseData.chiefComplaints.map((complaint, index) => (
          <div key={index} className='case-complaint-block'>
            <div className='case-form-row'>
              <div className='case-form-group'>
                <label className='case-label'>Complaint</label>
                <input
                  className='case-input'
                  name='complaint'
                  value={complaint.complaint}
                  onChange={(e) => handleChiefComplaintChange(index, e)}
                  placeholder='Complaint description'
                  required
                />
              </div>
              <div className='case-form-group'>
                <label className='case-label'>Duration</label>
                <input
                  className='case-input'
                  name='duration'
                  value={complaint.duration}
                  onChange={(e) => handleChiefComplaintChange(index, e)}
                  placeholder='Duration'
                />
              </div>
            </div>
            <div className='case-form-row'>
              <div className='case-form-group' style={{ flex: "1 1 100%" }}>
                <label className='case-label'>Description</label>
                <textarea
                  className='case-textarea'
                  name='description'
                  value={complaint.description}
                  onChange={(e) => handleChiefComplaintChange(index, e)}
                  placeholder='Additional details'
                />
              </div>
            </div>
          </div>
        ))}
        <button
          type='button'
          className='case-button'
          onClick={addChiefComplaint}
          style={{ backgroundColor: "#6c757d" }}
        >
          + Add Complaint
        </button>
      </section>

      {/* History of Present Illness */}
      <section className='case-section'>
        <h3 className='case-section-title'>3. History of Present Illness</h3>
        <textarea
          className='case-textarea'
          name='historyPresentIllness'
          value={caseData.historyPresentIllness}
          onChange={handleInputChange}
          placeholder='Details about current illness'
        />
      </section>

      {/* Past History */}
      <section className='case-section'>
        <h3 className='case-section-title'>4. Past History</h3>
        <div className='case-form-row'>
          <div className='case-form-group'>
            <label className='case-label'>Childhood Diseases</label>
            <textarea
              className='case-textarea'
              name='childhoodDiseases'
              value={caseData.pastHistory.childhoodDiseases}
              onChange={(e) =>
                setCaseData({
                  ...caseData,
                  pastHistory: {
                    ...caseData.pastHistory,
                    childhoodDiseases: e.target.value,
                  },
                })
              }
            />
          </div>
          <div className='case-form-group'>
            <label className='case-label'>Surgeries / Injuries</label>
            <textarea
              className='case-textarea'
              name='surgeriesInjuries'
              value={caseData.pastHistory.surgeriesInjuries}
              onChange={(e) =>
                setCaseData({
                  ...caseData,
                  pastHistory: {
                    ...caseData.pastHistory,
                    surgeriesInjuries: e.target.value,
                  },
                })
              }
            />
          </div>
          <div className='case-form-group'>
            <label className='case-label'>Major Illnesses</label>
            <textarea
              className='case-textarea'
              name='majorIllnesses'
              value={caseData.pastHistory.majorIllnesses}
              onChange={(e) =>
                setCaseData({
                  ...caseData,
                  pastHistory: {
                    ...caseData.pastHistory,
                    majorIllnesses: e.target.value,
                  },
                })
              }
            />
          </div>
        </div>
      </section>

      {/* Family History */}
      <section className='case-section'>
        <h3 className='case-section-title'>5. Family History</h3>
        <textarea
          className='case-textarea'
          name='familyHistory'
          value={caseData.familyHistory}
          onChange={handleInputChange}
          placeholder='Family medical history'
        />
      </section>

      {/* Personal History */}
      <section className='case-section'>
        <h3 className='case-section-title'>6. Personal History</h3>
        <div className='case-form-row'>
          {[
            { label: "Appetite", name: "appetite" },
            { label: "Cravings / Aversions", name: "cravingsAversions" },
            { label: "Thirst", name: "thirst" },
            { label: "Bowel", name: "bowel" },
            { label: "Urine", name: "urine" },
          ].map(({ label, name }) => (
            <div key={name} className='case-form-group'>
              <label className='case-label'>{label}</label>
              <input
                className='case-input'
                name={name}
                value={caseData.personalHistory[name]}
                onChange={(e) =>
                  setCaseData({
                    ...caseData,
                    personalHistory: {
                      ...caseData.personalHistory,
                      [name]: e.target.value,
                    },
                  })
                }
                onFocus={() => setFocusedInput(name)}
                onBlur={() => setFocusedInput(null)}
              />
            </div>
          ))}
        </div>
        <div className='case-form-row'>
          {[
            { label: "Sleep", name: "sleep" },
            { label: "Dreams", name: "dreams" },
            { label: "Sweat", name: "sweat" },
            { label: "Thermal", name: "thermal" },
            { label: "Habits", name: "habits" },
            { label: "Menstrual History", name: "menstrual" },
          ].map(({ label, name }) => (
            <div key={name} className='case-form-group'>
              <label className='case-label'>{label}</label>
              <input
                className='case-input'
                name={name}
                value={caseData.personalHistory[name]}
                onChange={(e) =>
                  setCaseData({
                    ...caseData,
                    personalHistory: {
                      ...caseData.personalHistory,
                      [name]: e.target.value,
                    },
                  })
                }
                onFocus={() => setFocusedInput(name)}
                onBlur={() => setFocusedInput(null)}
              />
            </div>
          ))}
        </div>
      </section>

      {/* Mental Symptoms */}
      <section className='case-section'>
        <h3 className='case-section-title'>7. Mental Symptoms</h3>
        <textarea
          className='case-textarea'
          name='mentalSymptoms'
          value={caseData.mentalSymptoms}
          onChange={handleInputChange}
          placeholder='Mental symptoms description'
        />
      </section>

      {/* General Remarks */}
      <section className='case-section'>
        <h3 className='case-section-title'>8. General Remarks</h3>
        <textarea
          className='case-textarea'
          name='generalRemarks'
          value={caseData.generalRemarks}
          onChange={handleInputChange}
          placeholder='General remarks'
        />
      </section>

      {/* Observations by Doctor */}
      <section className='case-section'>
        <h3 className='case-section-title'>9. Observations by Doctor</h3>
        <textarea
          className='case-textarea'
          name='observationsByDoctor'
          value={caseData.observationsByDoctor}
          onChange={handleInputChange}
          placeholder="Doctor's observations"
        />
      </section>

      {/* Prescription */}
      <section className='case-section'>
        <h3 className='case-section-title'>10. Prescription</h3>
        {caseData.prescription.map((prescription, index) => (
          <div key={index} className='case-prescription-block'>
            <div className='case-form-row'>
              <div className='case-form-group'>
                <label className='case-label'>Date</label>
                <input
                  type='date'
                  className='case-input'
                  name='date'
                  value={prescription.date}
                  onChange={(e) => handlePrescriptionChange(index, e)}
                />
              </div>
              <div className='case-form-group'>
                <label className='case-label'>Remedy Name</label>
                <input
                  className='case-input'
                  name='remedyName'
                  value={prescription.remedyName}
                  onChange={(e) => handlePrescriptionChange(index, e)}
                />
              </div>
              <div className='case-form-group'>
                <label className='case-label'>Potency</label>
                <input
                  className='case-input'
                  name='potency'
                  value={prescription.potency}
                  onChange={(e) => handlePrescriptionChange(index, e)}
                />
              </div>
            </div>
            <div className='case-form-row'>
              <div className='case-form-group'>
                <label className='case-label'>Dose</label>
                <input
                  className='case-input'
                  name='dose'
                  value={prescription.dose}
                  onChange={(e) => handlePrescriptionChange(index, e)}
                />
              </div>
              <div className='case-form-group' style={{ flex: "2 1 100%" }}>
                <label className='case-label'>Instructions</label>
                <textarea
                  className='case-textarea'
                  name='instructions'
                  value={prescription.instructions}
                  onChange={(e) => handlePrescriptionChange(index, e)}
                  placeholder='Instructions for patient'
                />
              </div>
            </div>
          </div>
        ))}
        <button
          type='button'
          className='case-button'
          onClick={addPrescription}
          style={{ backgroundColor: "#6c757d" }}
        >
          + Add Prescription
        </button>
      </section>

      <button type='submit' className='case-button'>
        Submit Case
      </button>

      {/* Submitted Data Preview */}
      {submittedData && (
        <div className='case-submitted-data-container'>
          <h4>Submitted Data Preview:</h4>
          <pre style={{ whiteSpace: "pre-wrap", wordWrap: "break-word" }}>
            {JSON.stringify(submittedData, null, 2)}
          </pre>
        </div>
      )}

      {/* AI Summary */}
      <div style={{ marginTop: "20px" }}>
        <button
          type='button'
          style={{ backgroundColor: "#ffc107", color: "#333" }}
          onClick={generateSummary}
          disabled={loadingSummary}
        >
          {loadingSummary ? "Generating AI Summary..." : "Generate AI Summary"}
        </button>
      </div>

      {aiSummary && (
        <div
          style={{
            marginTop: "20px",
            padding: "10px",
            border: "1px solid #ccc",
            backgroundColor: "#f9f9f9",
            whiteSpace: "pre-wrap",
            color: "#000",
          }}
        >
          <h3>AI Generated Summary</h3>
          <p>{aiSummary}</p>
        </div>
      )}
    </form>
  );
};

export default CaseSheetForm;
