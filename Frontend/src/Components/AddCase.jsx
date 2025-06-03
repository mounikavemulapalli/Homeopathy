import React, { useState } from "react";
import axios from "axios"; // Import Axios
import Input from "@/components/ui/input";
import Textarea from "@/components/ui/textarea";

const NewCase = () => {
  const [formData, setFormData] = useState({
    name: "",
    age: "",
    gender: "",
    maritalStatus: "",
    occupation: "",
    address: "",
    phone: "",
    dateOfVisit: "",
    chiefComplaints: "",
    historyOfPresentIllness: "",
    pastHistory: "",
    familyHistory: "",
    appetite: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      // Post data to backend
      const response = await axios.post(
        "http://localhost:5000/submit-case", // Replace with your actual backend URL
        formData
      );
      console.log("Case submitted successfully:", response.data);
      alert("Case submitted successfully!");
    } catch (error) {
      console.error("Error submitting case:", error);
      alert("Error submitting case. Please try again.");
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-6 font-sans">
      <h2 className="text-2xl font-semibold mb-6">New Case</h2>
      <form onSubmit={handleSubmit} className="space-y-5">
        {/* Row: Name, Age, Gender */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block mb-1">Name</label>
            <Input name="name" value={formData.name} onChange={handleChange} />
          </div>
          <div>
            <label className="block mb-1">Age</label>
            <Input name="age" value={formData.age} onChange={handleChange} type="number" />
          </div>
          <div>
            <label className="block mb-1">Gender</label>
            <Input name="gender" value={formData.gender} onChange={handleChange} />
          </div>
        </div>

        {/* Vertical group fields */}
        {[
          ["Marital Status", "maritalStatus"],
          ["Occupation", "occupation"],
          ["Address", "address"],
          ["Phone", "phone"],
          ["Date of Visit", "dateOfVisit"],
        ].map(([label, name]) => (
          <div key={name}>
            <label className="block mb-1">{label}</label>
            <Input name={name} value={formData[name]} onChange={handleChange} />
          </div>
        ))}

        {/* Textarea fields */}
        {[
          ["Chief Complaints", "chiefComplaints"],
          ["History of Present Illness", "historyOfPresentIllness"],
          ["Past History", "pastHistory"],
          ["Family History", "familyHistory"],
          ["Appetite", "appetite"],
        ].map(([label, name]) => (
          <div key={name}>
            <label className="block mb-1">{label}</label>
            <Textarea name={name} value={formData[name]} onChange={handleChange} />
          </div>
        ))}

        <button
          type="submit"
          className="mt-4 bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default NewCase;
