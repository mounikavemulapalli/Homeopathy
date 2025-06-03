import React, { useState, useEffect } from "react";
import axios from "axios"; // Import Axios

const ViewCases = () => {
  const [cases, setCases] = useState([]); // State to store the list of cases
  const [loading, setLoading] = useState(true); // Loading state

  useEffect(() => {
    // Fetch all cases when the component mounts
    const fetchCases = async () => {
      try {
        const response = await axios.get("http://localhost:5000/cases"); // Replace with your backend URL
        setCases(response.data); // Store cases in state
        setLoading(false); // Set loading to false
      } catch (error) {
        console.error("Error fetching cases:", error);
        setLoading(false); // Set loading to false even in case of an error
      }
    };

    fetchCases();
  }, []); // Empty dependency array means it runs once when the component mounts

  if (loading) {
    return <div>Loading...</div>; // Show loading text while fetching data
  }

  return (
    <div className="max-w-3xl mx-auto p-6 font-sans">
      <h2 className="text-2xl font-semibold mb-6">All Cases</h2>

      {cases.length === 0 ? (
        <p>No cases found.</p> // Show message if no cases are found
      ) : (
        <table className="min-w-full border-collapse">
          <thead>
            <tr>
              <th className="border p-2">Name</th>
              <th className="border p-2">Age</th>
              <th className="border p-2">Gender</th>
              <th className="border p-2">Phone</th>
              <th className="border p-2">Date of Visit</th>
            </tr>
          </thead>
          <tbody>
            {cases.map((caseItem) => (
              <tr key={caseItem._id}>
                <td className="border p-2">{caseItem.name}</td>
                <td className="border p-2">{caseItem.age}</td>
                <td className="border p-2">{caseItem.gender}</td>
                <td className="border p-2">{caseItem.phone}</td>
                <td className="border p-2">{caseItem.dateOfVisit}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default ViewCases;
