/** @format */

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
    formData.append("image", caseData.image); // image file object
    formData.append("data", JSON.stringify({ ...caseData, image: undefined })); // rest of the data

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
          "You have exceeded your Gemini AI API quota. Please check your billing settings.."
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
      console.error("Error generating summary:", error);
      alert("An unexpected error occurred while generating summary.");
    }

    setLoadingSummary(false);
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>Case Sheet</h2>

      {/* Image Upload */}
      <div>
        <label>Upload Face Image: </label>
        <input type='file' accept='image/*' onChange={handleImageUpload} />
        <p>{caseData.image ? caseData.image.name : "No file chosen"}</p>
      </div>

      {/* Basic Info */}
      <h3>1. Basic Patient Information</h3>
      <div>
        <label>Name:</label>
        <input
          name='name'
          value={caseData.name}
          onChange={handleInputChange}
          placeholder='Enter Name'
        />
      </div>
      <div>
        <label>Age / Gender:</label>
        <input
          name='age'
          value={caseData.age}
          onChange={handleInputChange}
          placeholder='Age'
        />
        <input
          name='gender'
          value={caseData.gender}
          onChange={handleInputChange}
          placeholder='Gender'
        />
      </div>
      <div>
        <label>Marital Status:</label>
        <input
          name='maritalStatus'
          value={caseData.maritalStatus}
          onChange={handleInputChange}
        />
      </div>
      <div>
        <label>Occupation:</label>
        <input
          name='occupation'
          value={caseData.occupation}
          onChange={handleInputChange}
        />
      </div>
      <div>
        <label>Address:</label>
        <input
          name='address'
          value={caseData.address}
          onChange={handleInputChange}
        />
      </div>
      <div>
        <label>Phone / WhatsApp:</label>
        <input
          name='phone'
          value={caseData.phone}
          onChange={handleInputChange}
        />
      </div>
      <div>
        <label>Date of Visit:</label>
        <input
          type='date'
          name='dateOfVisit'
          value={caseData.dateOfVisit}
          onChange={handleInputChange}
        />
      </div>

      {/* Chief Complaints */}
      <h3>2. Chief Complaints</h3>
      {caseData.chiefComplaints.map((complaint, index) => (
        <div key={index}>
          <label>Complaint:</label>
          <input
            name='complaint'
            value={complaint.complaint}
            onChange={(e) => handleChiefComplaintChange(index, e)}
          />
          <label>Duration:</label>
          <input
            name='duration'
            value={complaint.duration}
            onChange={(e) => handleChiefComplaintChange(index, e)}
          />
          <label>Description:</label>
          <input
            name='description'
            value={complaint.description}
            onChange={(e) => handleChiefComplaintChange(index, e)}
          />
        </div>
      ))}
      <button onClick={addChiefComplaint}>+ Add Complaint</button>

      {/* History of Present Illness */}
      <h3>3. History of Present Illness</h3>
      <textarea
        name='historyPresentIllness'
        value={caseData.historyPresentIllness}
        onChange={handleInputChange}
      />

      {/* Past History */}
      <h3>4. Past History</h3>
      <input
        name='childhoodDiseases'
        placeholder='Childhood Diseases'
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
      <input
        name='surgeriesInjuries'
        placeholder='Surgeries / Injuries'
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
      <input
        name='majorIllnesses'
        placeholder='Major Illnesses'
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

      {/* Family History */}
      <h3>5. Family History</h3>
      <textarea
        name='familyHistory'
        value={caseData.familyHistory}
        onChange={handleInputChange}
        placeholder='Diabetes / Hypertension / etc.'
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
                personalHistory: {
                  ...caseData.personalHistory,
                  [key]: e.target.value,
                },
              })
            }
          />
        </div>
      ))}

      {/* Mental Symptoms */}
      <h3>7. Mental Symptoms</h3>
      <textarea
        name='mentalSymptoms'
        value={caseData.mentalSymptoms}
        onChange={handleInputChange}
        placeholder='E.g., Fear, Anxiety, etc.'
      />

      {/* General Remarks */}
      <h3>8. General Remarks</h3>
      <textarea
        name='generalRemarks'
        value={caseData.generalRemarks}
        onChange={handleInputChange}
      />

      {/* Observations by Doctor */}
      <h3>9. Observations by Doctor</h3>
      <textarea
        name='observationsByDoctor'
        value={caseData.observationsByDoctor}
        onChange={handleInputChange}
      />

      {/* Prescription */}
      <h3>10. Prescription</h3>
      {caseData.prescription.map((p, index) => (
        <div key={index}>
          <input
            type='date'
            name='date'
            value={p.date}
            onChange={(e) => handlePrescriptionChange(index, e)}
          />
          <input
            name='remedyName'
            placeholder='Remedy'
            value={p.remedyName}
            onChange={(e) => handlePrescriptionChange(index, e)}
          />
          <input
            name='potency'
            placeholder='Potency'
            value={p.potency}
            onChange={(e) => handlePrescriptionChange(index, e)}
          />
          <input
            name='dose'
            placeholder='Dose'
            value={p.dose}
            onChange={(e) => handlePrescriptionChange(index, e)}
          />
          <textarea
            name='instructions'
            placeholder='Instructions'
            value={p.instructions}
            onChange={(e) => handlePrescriptionChange(index, e)}
          />
        </div>
      ))}
      <button onClick={addPrescription}>+ Add Prescription</button>
      {submittedData && (
        <div
          style={{
            marginTop: "20px",
            padding: "10px",
            border: "1px solid gray",
          }}
        >
          <h3>Submitted Case Summary</h3>
          <p>
            <strong>Name:</strong> {submittedData.name}
          </p>
          <p>
            <strong>Age:</strong> {submittedData.age}
          </p>
          {/* Add more fields here */}
        </div>
      )}
      <div style={{ marginTop: "20px" }}>
        <button onClick={generateSummary} disabled={loadingSummary}>
          {loadingSummary ? "Generating Summary..." : "Generate AI Summary"}
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
          <div style={{ fontSize: 12, color: "#888", marginTop: 8 }}>
            Powered by Gemini AI
          </div>
        </div>
      )}
      {/* Submit */}
      <div>
        <button onClick={handleSubmit} style={{ marginTop: "20px" }}>
          Submit
        </button>
      </div>

      <button
        type='button'
        style={{ backgroundColor: "#ffc107", color: "#333" }}
        onClick={generateSummary}
        disabled={loadingSummary}
      >
        {loadingSummary ? "Generating AI Summary..." : "Generate AI Summary"}
      </button>
    </div>
  );
};

export default CaseSheetForm;
// import React, { useState } from "react";

// const initialCaseData = {
//   name: "",
//   age: "",
//   gender: "",
//   maritalStatus: "",
//   occupation: "",
//   address: "",
//   phone: "",
//   dateOfVisit: "",
//   chiefComplaints: [{ complaint: "", duration: "", description: "" }],
//   historyPresentIllness: "",
//   pastHistory: {
//     childhoodDiseases: "",
//     surgeriesInjuries: "",
//     majorIllnesses: "",
//   },
//   familyHistory: "",
//   personalHistory: {
//     appetite: "",
//     cravingsAversions: "",
//     thirst: "",
//     bowel: "",
//     urine: "",
//     sleep: "",
//     dreams: "",
//     sweat: "",
//     thermal: "",
//     habits: "",
//     menstrual: "",
//   },
//   mentalSymptoms: "",
//   generalRemarks: "",
//   observationsByDoctor: "",
//   prescription: [
//     { date: "", remedyName: "", potency: "", dose: "", instructions: "" },
//   ],
//   image: null,
// };

// const CaseSheetForm = () => {
//   const [submittedData, setSubmittedData] = useState(null);
//   const [caseData, setCaseData] = useState(initialCaseData);

//   // Styles
//   const styles = {
//     container: {
//       maxWidth: 900,
//       margin: "20px auto",
//       padding: 20,
//       fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
//       background: "#f9f9f9",
//       borderRadius: 8,
//       boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
//     },
//     section: {
//       marginBottom: 30,
//       paddingBottom: 20,
//       borderBottom: "1px solid #ddd",
//     },
//     sectionTitle: {
//       marginBottom: 15,
//       color: "#333",
//       fontSize: 20,
//       fontWeight: "600",
//       borderBottom: "2px solid #3498db",
//       paddingBottom: 6,
//     },
//     formRow: {
//       display: "flex",
//       flexWrap: "wrap",
//       gap: 15,
//       marginBottom: 15,
//       alignItems: "center",
//     },
//     formGroup: {
//       flex: "1 1 200px",
//       display: "flex",
//       flexDirection: "column",
//     },
//     label: {
//       marginBottom: 5,
//       fontWeight: 600,
//       color: "#555",
//       fontSize: 14,
//     },
//     input: {
//       padding: "8px 10px",
//       fontSize: 14,
//       borderRadius: 4,
//       border: "1px solid #ccc",
//       outline: "none",
//       transition: "border-color 0.2s",
//     },
//     inputFocus: {
//       borderColor: "#3498db",
//       boxShadow: "0 0 5px rgba(52, 152, 219, 0.5)",
//     },
//     textarea: {
//       minHeight: 80,
//       padding: "8px 10px",
//       fontSize: 14,
//       borderRadius: 4,
//       border: "1px solid #ccc",
//       resize: "vertical",
//       outline: "none",
//       transition: "border-color 0.2s",
//       fontFamily: "inherit",
//     },
//     button: {
//       backgroundColor: "#3498db",
//       color: "#fff",
//       border: "none",
//       padding: "10px 18px",
//       borderRadius: 5,
//       cursor: "pointer",
//       fontWeight: 600,
//       fontSize: 16,
//       marginTop: 10,
//       transition: "background-color 0.3s",
//     },
//     buttonHover: {
//       backgroundColor: "#2980b9",
//     },
//     complaintBlock: {
//       backgroundColor: "#e8f0fe",
//       padding: 15,
//       borderRadius: 6,
//       marginBottom: 15,
//     },
//     prescriptionBlock: {
//       backgroundColor: "#f0e8fe",
//       padding: 15,
//       borderRadius: 6,
//       marginBottom: 15,
//     },
//     fileInputLabel: {
//       fontWeight: 600,
//       marginBottom: 5,
//       display: "inline-block",
//     },
//     submittedDataContainer: {
//       marginTop: 30,
//       padding: 15,
//       backgroundColor: "#d4edda",
//       border: "1px solid #c3e6cb",
//       borderRadius: 5,
//       color: "#155724",
//     },
//   };

//   // For inputs focus styling (optional enhancement)
//   const [focusedInput, setFocusedInput] = useState(null);

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setCaseData({ ...caseData, [name]: value });
//   };

//   const handleChiefComplaintChange = (index, e) => {
//     const { name, value } = e.target;
//     const updatedComplaints = [...caseData.chiefComplaints];
//     updatedComplaints[index][name] = value;
//     setCaseData({ ...caseData, chiefComplaints: updatedComplaints });
//   };

//   const addChiefComplaint = () => {
//     setCaseData({
//       ...caseData,
//       chiefComplaints: [
//         ...caseData.chiefComplaints,
//         { complaint: "", duration: "", description: "" },
//       ],
//     });
//   };

//   const handlePrescriptionChange = (index, e) => {
//     const { name, value } = e.target;
//     const updatedPrescriptions = [...caseData.prescription];
//     updatedPrescriptions[index][name] = value;
//     setCaseData({ ...caseData, prescription: updatedPrescriptions });
//   };

//   const addPrescription = () => {
//     setCaseData({
//       ...caseData,
//       prescription: [
//         ...caseData.prescription,
//         { date: "", remedyName: "", potency: "", dose: "", instructions: "" },
//       ],
//     });
//   };

//   const handleImageUpload = (e) => {
//     setCaseData({ ...caseData, image: e.target.files[0] });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     const formData = new FormData();
//     formData.append("image", caseData.image); // image file object
//     formData.append("data", JSON.stringify({ ...caseData, image: undefined })); // rest of the data

//     try {
//       const response = await fetch("http://localhost:5000/api/cases", {
//         method: "POST",
//         body: formData,
//       });

//       const result = await response.json();
//       if (response.ok) {
//         alert("Case submitted successfully!");
//         setSubmittedData(caseData);
//         setCaseData({ ...initialCaseData });
//       } else {
//         alert("Failed to submit case.");
//       }
//     } catch (error) {
//       alert("Error while submitting case.");
//     }
//   };

//   // Helper to apply focus style
//   const inputStyle = (name) =>
//     focusedInput === name
//       ? { ...styles.input, ...styles.inputFocus }
//       : styles.input;

//   return (
//     <form style={styles.container} onSubmit={handleSubmit}>
//       <h2 style={{ textAlign: "center", marginBottom: 25 }}>Case Sheet</h2>

//       {/* Image Upload */}
//       <div style={styles.section}>
//         <label style={styles.fileInputLabel}>Upload Face Image:</label>
//         <input type='file' accept='image/*' onChange={handleImageUpload} />
//         <p style={{ fontSize: 12, color: "#555" }}>
//           {caseData.image ? caseData.image.name : "No file chosen"}
//         </p>
//       </div>

//       {/* Basic Info */}
//       <section style={styles.section}>
//         <h3 style={styles.sectionTitle}>1. Basic Patient Information</h3>
//         <div style={styles.formRow}>
//           <div style={styles.formGroup}>
//             <label style={styles.label}>Name</label>
//             <input
//               style={inputStyle("name")}
//               name='name'
//               value={caseData.name}
//               onChange={handleInputChange}
//               onFocus={() => setFocusedInput("name")}
//               onBlur={() => setFocusedInput(null)}
//               placeholder='Enter full name'
//               required
//             />
//           </div>
//           <div style={styles.formGroup}>
//             <label style={styles.label}>Age</label>
//             <input
//               style={inputStyle("age")}
//               name='age'
//               value={caseData.age}
//               onChange={handleInputChange}
//               onFocus={() => setFocusedInput("age")}
//               onBlur={() => setFocusedInput(null)}
//               placeholder='Age'
//               type='number'
//               min={0}
//               required
//             />
//           </div>
//           <div style={styles.formGroup}>
//             <label style={styles.label}>Gender</label>
//             <input
//               style={inputStyle("gender")}
//               name='gender'
//               value={caseData.gender}
//               onChange={handleInputChange}
//               onFocus={() => setFocusedInput("gender")}
//               onBlur={() => setFocusedInput(null)}
//               placeholder='Gender'
//               required
//             />
//           </div>
//         </div>

//         <div style={styles.formRow}>
//           <div style={styles.formGroup}>
//             <label style={styles.label}>Marital Status</label>
//             <input
//               style={inputStyle("maritalStatus")}
//               name='maritalStatus'
//               value={caseData.maritalStatus}
//               onChange={handleInputChange}
//               onFocus={() => setFocusedInput("maritalStatus")}
//               onBlur={() => setFocusedInput(null)}
//               placeholder='Single/Married/etc.'
//             />
//           </div>
//           <div style={styles.formGroup}>
//             <label style={styles.label}>Occupation</label>
//             <input
//               style={inputStyle("occupation")}
//               name='occupation'
//               value={caseData.occupation}
//               onChange={handleInputChange}
//               onFocus={() => setFocusedInput("occupation")}
//               onBlur={() => setFocusedInput(null)}
//               placeholder='Occupation'
//             />
//           </div>
//         </div>

//         <div style={styles.formRow}>
//           <div style={{ ...styles.formGroup, flex: "2 1 100%" }}>
//             <label style={styles.label}>Address</label>
//             <input
//               style={inputStyle("address")}
//               name='address'
//               value={caseData.address}
//               onChange={handleInputChange}
//               onFocus={() => setFocusedInput("address")}
//               onBlur={() => setFocusedInput(null)}
//               placeholder='Address'
//             />
//           </div>
//         </div>

//         <div style={styles.formRow}>
//           <div style={styles.formGroup}>
//             <label style={styles.label}>Phone / WhatsApp</label>
//             <input
//               style={inputStyle("phone")}
//               name='phone'
//               value={caseData.phone}
//               onChange={handleInputChange}
//               onFocus={() => setFocusedInput("phone")}
//               onBlur={() => setFocusedInput(null)}
//               placeholder='Phone number'
//             />
//           </div>
//           <div style={styles.formGroup}>
//             <label style={styles.label}>Date of Visit</label>
//             <input
//               type='date'
//               style={inputStyle("dateOfVisit")}
//               name='dateOfVisit'
//               value={caseData.dateOfVisit}
//               onChange={handleInputChange}
//               onFocus={() => setFocusedInput("dateOfVisit")}
//               onBlur={() => setFocusedInput(null)}
//             />
//           </div>
//         </div>
//       </section>

//       {/* Chief Complaints */}
//       <section style={styles.section}>
//         <h3 style={styles.sectionTitle}>2. Chief Complaints</h3>
//         {caseData.chiefComplaints.map((complaint, index) => (
//           <div key={index} style={styles.complaintBlock}>
//             <div style={styles.formRow}>
//               <div style={styles.formGroup}>
//                 <label style={styles.label}>Complaint</label>
//                 <input
//                   style={inputStyle(`complaint-${index}`)}
//                   name='complaint'
//                   value={complaint.complaint}
//                   onChange={(e) => handleChiefComplaintChange(index, e)}
//                   onFocus={() => setFocusedInput(`complaint-${index}`)}
//                   onBlur={() => setFocusedInput(null)}
//                   placeholder='Complaint description'
//                   required
//                 />
//               </div>
//               <div style={styles.formGroup}>
//                 <label style={styles.label}>Duration</label>
//                 <input
//                   style={inputStyle(`duration-${index}`)}
//                   name='duration'
//                   value={complaint.duration}
//                   onChange={(e) => handleChiefComplaintChange(index, e)}
//                   onFocus={() => setFocusedInput(`duration-${index}`)}
//                   onBlur={() => setFocusedInput(null)}
//                   placeholder='Duration'
//                 />
//               </div>
//             </div>
//             <div style={styles.formRow}>
//               <div style={{ ...styles.formGroup, flex: "1 1 100%" }}>
//                 <label style={styles.label}>Description</label>
//                 <textarea
//                   style={styles.textarea}
//                   name='description'
//                   value={complaint.description}
//                   onChange={(e) => handleChiefComplaintChange(index, e)}
//                   placeholder='Additional details'
//                 />
//               </div>
//             </div>
//           </div>
//         ))}
//         <button
//           type='button'
//           style={{ ...styles.button, backgroundColor: "#6c757d" }}
//           onClick={addChiefComplaint}
//         >
//           + Add Complaint
//         </button>
//       </section>

//       {/* History of Present Illness */}
//       <section style={styles.section}>
//         <h3 style={styles.sectionTitle}>3. History of Present Illness</h3>
//         <textarea
//           style={styles.textarea}
//           name='historyPresentIllness'
//           value={caseData.historyPresentIllness}
//           onChange={handleInputChange}
//           placeholder='Details about current illness'
//         />
//       </section>

//       {/* Past History */}
//       <section style={styles.section}>
//         <h3 style={styles.sectionTitle}>4. Past History</h3>
//         <div style={styles.formRow}>
//           <div style={styles.formGroup}>
//             <label style={styles.label}>Childhood Diseases</label>
//             <textarea
//               style={styles.textarea}
//               name='childhoodDiseases'
//               value={caseData.pastHistory.childhoodDiseases}
//               onChange={(e) =>
//                 setCaseData({
//                   ...caseData,
//                   pastHistory: {
//                     ...caseData.pastHistory,
//                     childhoodDiseases: e.target.value,
//                   },
//                 })
//               }
//             />
//           </div>
//           <div style={styles.formGroup}>
//             <label style={styles.label}>Surgeries / Injuries</label>
//             <textarea
//               style={styles.textarea}
//               name='surgeriesInjuries'
//               value={caseData.pastHistory.surgeriesInjuries}
//               onChange={(e) =>
//                 setCaseData({
//                   ...caseData,
//                   pastHistory: {
//                     ...caseData.pastHistory,
//                     surgeriesInjuries: e.target.value,
//                   },
//                 })
//               }
//             />
//           </div>
//           <div style={styles.formGroup}>
//             <label style={styles.label}>Major Illnesses</label>
//             <textarea
//               style={styles.textarea}
//               name='majorIllnesses'
//               value={caseData.pastHistory.majorIllnesses}
//               onChange={(e) =>
//                 setCaseData({
//                   ...caseData,
//                   pastHistory: {
//                     ...caseData.pastHistory,
//                     majorIllnesses: e.target.value,
//                   },
//                 })
//               }
//             />
//           </div>
//         </div>
//       </section>

//       {/* Family History */}
//       <section style={styles.section}>
//         <h3 style={styles.sectionTitle}>5. Family History</h3>
//         <textarea
//           style={styles.textarea}
//           name='familyHistory'
//           value={caseData.familyHistory}
//           onChange={handleInputChange}
//           placeholder='Family medical history'
//         />
//       </section>

//       {/* Personal History */}
//       <section style={styles.section}>
//         <h3 style={styles.sectionTitle}>6. Personal History</h3>
//         <div style={styles.formRow}>
//           {[
//             { label: "Appetite", name: "appetite" },
//             { label: "Cravings / Aversions", name: "cravingsAversions" },
//             { label: "Thirst", name: "thirst" },
//             { label: "Bowel", name: "bowel" },
//             { label: "Urine", name: "urine" },
//           ].map(({ label, name }) => (
//             <div key={name} style={styles.formGroup}>
//               <label style={styles.label}>{label}</label>
//               <input
//                 style={inputStyle(name)}
//                 name={name}
//                 value={caseData.personalHistory[name]}
//                 onChange={(e) =>
//                   setCaseData({
//                     ...caseData,
//                     personalHistory: {
//                       ...caseData.personalHistory,
//                       [name]: e.target.value,
//                     },
//                   })
//                 }
//                 onFocus={() => setFocusedInput(name)}
//                 onBlur={() => setFocusedInput(null)}
//               />
//             </div>
//           ))}
//         </div>
//         <div style={styles.formRow}>
//           {[
//             { label: "Sleep", name: "sleep" },
//             { label: "Dreams", name: "dreams" },
//             { label: "Sweat", name: "sweat" },
//             { label: "Thermal", name: "thermal" },
//             { label: "Habits", name: "habits" },
//             { label: "Menstrual History", name: "menstrual" },
//           ].map(({ label, name }) => (
//             <div key={name} style={styles.formGroup}>
//               <label style={styles.label}>{label}</label>
//               <input
//                 style={inputStyle(name)}
//                 name={name}
//                 value={caseData.personalHistory[name]}
//                 onChange={(e) =>
//                   setCaseData({
//                     ...caseData,
//                     personalHistory: {
//                       ...caseData.personalHistory,
//                       [name]: e.target.value,
//                     },
//                   })
//                 }
//                 onFocus={() => setFocusedInput(name)}
//                 onBlur={() => setFocusedInput(null)}
//               />
//             </div>
//           ))}
//         </div>
//       </section>

//       {/* Mental Symptoms */}
//       <section style={styles.section}>
//         <h3 style={styles.sectionTitle}>7. Mental Symptoms</h3>
//         <textarea
//           style={styles.textarea}
//           name='mentalSymptoms'
//           value={caseData.mentalSymptoms}
//           onChange={handleInputChange}
//           placeholder='Mental symptoms description'
//         />
//       </section>

//       {/* General Remarks */}
//       <section style={styles.section}>
//         <h3 style={styles.sectionTitle}>8. General Remarks</h3>
//         <textarea
//           style={styles.textarea}
//           name='generalRemarks'
//           value={caseData.generalRemarks}
//           onChange={handleInputChange}
//           placeholder='General remarks'
//         />
//       </section>

//       {/* Observations by Doctor */}
//       <section style={styles.section}>
//         <h3 style={styles.sectionTitle}>9. Observations by Doctor</h3>
//         <textarea
//           style={styles.textarea}
//           name='observationsByDoctor'
//           value={caseData.observationsByDoctor}
//           onChange={handleInputChange}
//           placeholder="Doctor's observations"
//         />
//       </section>

//       {/* Prescription */}
//       <section style={styles.section}>
//         <h3 style={styles.sectionTitle}>10. Prescription</h3>
//         {caseData.prescription.map((prescription, index) => (
//           <div key={index} style={styles.prescriptionBlock}>
//             <div style={styles.formRow}>
//               <div style={styles.formGroup}>
//                 <label style={styles.label}>Date</label>
//                 <input
//                   type='date'
//                   style={inputStyle(`prescriptionDate-${index}`)}
//                   name='date'
//                   value={prescription.date}
//                   onChange={(e) => handlePrescriptionChange(index, e)}
//                   onFocus={() => setFocusedInput(`prescriptionDate-${index}`)}
//                   onBlur={() => setFocusedInput(null)}
//                 />
//               </div>
//               <div style={styles.formGroup}>
//                 <label style={styles.label}>Remedy Name</label>
//                 <input
//                   style={inputStyle(`remedyName-${index}`)}
//                   name='remedyName'
//                   value={prescription.remedyName}
//                   onChange={(e) => handlePrescriptionChange(index, e)}
//                   onFocus={() => setFocusedInput(`remedyName-${index}`)}
//                   onBlur={() => setFocusedInput(null)}
//                 />
//               </div>
//               <div style={styles.formGroup}>
//                 <label style={styles.label}>Potency</label>
//                 <input
//                   style={inputStyle(`potency-${index}`)}
//                   name='potency'
//                   value={prescription.potency}
//                   onChange={(e) => handlePrescriptionChange(index, e)}
//                   onFocus={() => setFocusedInput(`potency-${index}`)}
//                   onBlur={() => setFocusedInput(null)}
//                 />
//               </div>
//             </div>
//             <div style={styles.formRow}>
//               <div style={styles.formGroup}>
//                 <label style={styles.label}>Dose</label>
//                 <input
//                   style={inputStyle(`dose-${index}`)}
//                   name='dose'
//                   value={prescription.dose}
//                   onChange={(e) => handlePrescriptionChange(index, e)}
//                   onFocus={() => setFocusedInput(`dose-${index}`)}
//                   onBlur={() => setFocusedInput(null)}
//                 />
//               </div>
//               <div style={{ ...styles.formGroup, flex: "2 1 100%" }}>
//                 <label style={styles.label}>Instructions</label>
//                 <textarea
//                   style={styles.textarea}
//                   name='instructions'
//                   value={prescription.instructions}
//                   onChange={(e) => handlePrescriptionChange(index, e)}
//                   placeholder='Instructions for patient'
//                 />
//               </div>
//             </div>
//           </div>
//         ))}
//         <button
//           type='button'
//           style={{ ...styles.button, backgroundColor: "#6c757d" }}
//           onClick={addPrescription}
//         >
//           + Add Prescription
//         </button>
//       </section>

//       <button type='submit' style={styles.button}>
//         Submit Case
//       </button>

//       {/* Submitted Data Preview */}
//       {submittedData && (
//         <div style={styles.submittedDataContainer}>
//           <h4>Submitted Data Preview:</h4>
//           <pre style={{ whiteSpace: "pre-wrap", wordWrap: "break-word" }}>
//             {JSON.stringify(submittedData, null, 2)}
//           </pre>
//         </div>
//       )}
//     </form>
//   );
// };

// export default CaseSheetForm;
