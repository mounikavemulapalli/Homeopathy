import React, { useState } from "react";
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
  prescription: [{ date: "", remedyName: "", potency: "", dose: "", instructions: "" }],
  image: null,
};

const CaseSheetForm = () => {
  const [submittedData, setSubmittedData] = useState(null);
  const [caseData, setCaseData] = useState(initialCaseData);
  
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
      chiefComplaints: [...caseData.chiefComplaints, { complaint: "", duration: "", description: "" }],
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
      prescription: [...caseData.prescription, { date: "", remedyName: "", potency: "", dose: "", instructions: "" }],
    });
  };

  const handleImageUpload = (e) => {
    setCaseData({ ...caseData, image: e.target.files[0] });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("image", caseData.image);

    const caseDataToSend = { ...caseData };
    delete caseDataToSend.image;
    formData.append("data", JSON.stringify(caseDataToSend));

    try {
      const response = await fetch("http://localhost:5000/api/submit-case", {
        method: "POST",
        body: formData,
      });

      const result = await response.json();
      if (response.ok) {
        alert("Case submitted successfully!");
        setSubmittedData(caseData);
        setCaseData({ ...initialCaseData });
        console.log("Response from backend:", result);
      } else {
        console.error("Submission failed:", result);
        alert("Failed to submit case.");
      }
    } catch (error) {
      console.error("Error submitting case:", error);
      alert("Error while submitting case.");
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>Case Sheet</h2>

      {/* Image Upload */}
      <div>
        <label>Upload Face Image: </label>
        <input type="file" accept="image/*" onChange={handleImageUpload} />
        <p>{caseData.image ? caseData.image.name : "No file chosen"}</p>
      </div>

      {/* Basic Info */}
      <h3>1. Basic Patient Information</h3>
      <div>
        <label>Name:</label>
        <input name="name" value={caseData.name} onChange={handleInputChange} placeholder="Enter Name" />
      </div>
      <div>
        <label>Age / Gender:</label>
        <input name="age" value={caseData.age} onChange={handleInputChange} placeholder="Age" />
        <input name="gender" value={caseData.gender} onChange={handleInputChange} placeholder="Gender" />
      </div>
      <div>
        <label>Marital Status:</label>
        <input name="maritalStatus" value={caseData.maritalStatus} onChange={handleInputChange} />
      </div>
      <div>
        <label>Occupation:</label>
        <input name="occupation" value={caseData.occupation} onChange={handleInputChange} />
      </div>
      <div>
        <label>Address:</label>
        <input name="address" value={caseData.address} onChange={handleInputChange} />
      </div>
      <div>
        <label>Phone / WhatsApp:</label>
        <input name="phone" value={caseData.phone} onChange={handleInputChange} />
      </div>
      <div>
        <label>Date of Visit:</label>
        <input type="date" name="dateOfVisit" value={caseData.dateOfVisit} onChange={handleInputChange} />
      </div>

      {/* Chief Complaints */}
      <h3>2. Chief Complaints</h3>
      {caseData.chiefComplaints.map((complaint, index) => (
        <div key={index}>
          <label>Complaint:</label>
          <input name="complaint" value={complaint.complaint} onChange={(e) => handleChiefComplaintChange(index, e)} />
          <label>Duration:</label>
          <input name="duration" value={complaint.duration} onChange={(e) => handleChiefComplaintChange(index, e)} />
          <label>Description:</label>
          <input name="description" value={complaint.description} onChange={(e) => handleChiefComplaintChange(index, e)} />
        </div>
      ))}
      <button onClick={addChiefComplaint}>+ Add Complaint</button>

      {/* History of Present Illness */}
      <h3>3. History of Present Illness</h3>
      <textarea name="historyPresentIllness" value={caseData.historyPresentIllness} onChange={handleInputChange} />

      {/* Past History */}
      <h3>4. Past History</h3>
      <input
        name="childhoodDiseases"
        placeholder="Childhood Diseases"
        value={caseData.pastHistory.childhoodDiseases}
        onChange={(e) =>
          setCaseData({
            ...caseData,
            pastHistory: { ...caseData.pastHistory, childhoodDiseases: e.target.value },
          })
        }
      />
      <input
        name="surgeriesInjuries"
        placeholder="Surgeries / Injuries"
        value={caseData.pastHistory.surgeriesInjuries}
        onChange={(e) =>
          setCaseData({
            ...caseData,
            pastHistory: { ...caseData.pastHistory, surgeriesInjuries: e.target.value },
          })
        }
      />
      <input
        name="majorIllnesses"
        placeholder="Major Illnesses"
        value={caseData.pastHistory.majorIllnesses}
        onChange={(e) =>
          setCaseData({
            ...caseData,
            pastHistory: { ...caseData.pastHistory, majorIllnesses: e.target.value },
          })
        }
      />

      {/* Family History */}
      <h3>5. Family History</h3>
      <textarea
        name="familyHistory"
        value={caseData.familyHistory}
        onChange={handleInputChange}
        placeholder="Diabetes / Hypertension / etc."
      />

      {/* Personal History */}
      <h3>6. Personal History</h3>
      {Object.keys(caseData.personalHistory).map((key) => (
        <div key={key}>
          <label>{key}:</label>
          <input
            name={key}
            value={caseData.personalHistory[key]}
            onChange={(e) =>
              setCaseData({
                ...caseData,
                personalHistory: { ...caseData.personalHistory, [key]: e.target.value },
              })
            }
          />
        </div>
      ))}

      {/* Mental Symptoms */}
      <h3>7. Mental Symptoms</h3>
      <textarea
        name="mentalSymptoms"
        value={caseData.mentalSymptoms}
        onChange={handleInputChange}
        placeholder="E.g., Fear, Anxiety, etc."
      />

      {/* General Remarks */}
      <h3>8. General Remarks</h3>
      <textarea name="generalRemarks" value={caseData.generalRemarks} onChange={handleInputChange} />

      {/* Observations by Doctor */}
      <h3>9. Observations by Doctor</h3>
      <textarea
        name="observationsByDoctor"
        value={caseData.observationsByDoctor}
        onChange={handleInputChange}
      />

      {/* Prescription */}
      <h3>10. Prescription</h3>
      {caseData.prescription.map((p, index) => (
        <div key={index}>
          <input type="date" name="date" value={p.date} onChange={(e) => handlePrescriptionChange(index, e)} />
          <input name="remedyName" placeholder="Remedy" value={p.remedyName} onChange={(e) => handlePrescriptionChange(index, e)} />
          <input name="potency" placeholder="Potency" value={p.potency} onChange={(e) => handlePrescriptionChange(index, e)} />
          <input name="dose" placeholder="Dose" value={p.dose} onChange={(e) => handlePrescriptionChange(index, e)} />
          <textarea name="instructions" placeholder="Instructions" value={p.instructions} onChange={(e) => handlePrescriptionChange(index, e)} />
        </div>
      ))}
      <button onClick={addPrescription}>+ Add Prescription</button>
      {submittedData && (
  <div style={{ marginTop: "20px", padding: "10px", border: "1px solid gray" }}>
    <h3>Submitted Case Summary</h3>
    <p><strong>Name:</strong> {submittedData.name}</p>
    <p><strong>Age:</strong> {submittedData.age}</p>
    {/* Add more fields here */}
  </div>
)}

      {/* Submit */}
      <div>
        <button onClick={handleSubmit} style={{ marginTop: "20px" }}>
          Submit
        </button>
      </div>
    </div>
  );
};

export default CaseSheetForm;
