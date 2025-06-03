// // import React, { useEffect, useState } from "react";

// // const CasesList = () => {
// //   const [cases, setCases] = useState([]);

// //   // Dummy fetch for now — replace with API call
// //   // useEffect(() => {
// //   //   const dummyCases = [
// //   //     {
// //   //       id: 1,
// //   //       name: "Ravi Kumar",
// //   //       age: 28,
// //   //       gender: "Male",
// //   //       phone: "9876543210",
// //   //       dateOfVisit: "2025-05-12",
// //   //       chiefComplaints: "Headache, anxiety",
// //   //     },
// //   //     {
// //   //       id: 2,
// //   //       name: "Sita Devi",
// //   //       age: 35,
// //   //       gender: "Female",
// //   //       phone: "9845123456",
// //   //       dateOfVisit: "2025-05-11",
// //   //       chiefComplaints: "Joint pain, weakness",
// //   //     },
// //   //   ];
// //   //   setCases(dummyCases);
// //   // }, []);
// //   useEffect(() => {
// //     const fetchCases = async () => {
// //       try {
// //         const response = await fetch("http://localhost:5000/api/cases");
// //         const data = await response.json();
// //         setCases(data);
// //       } catch (error) {
// //         console.error("Error fetching cases:", error);
// //       }
// //     };

// //     fetchCases();
// //   }, []);

// //   return (
// //     <div className="max-w-5xl mx-auto p-4">
// //       <h2 className="text-2xl font-bold text-center mb-6">All Cases</h2>

// //       {cases.length === 0 ? (
// //         <p className="text-center text-gray-500">No cases available.</p>
// //       ) : (
// //         <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
// //           {cases.map((caseItem) => (
// //             <div key={caseItem.id} className="bg-white shadow-md rounded-lg p-4 hover:shadow-lg transition">
// //               <div className="flex justify-between mb-2">
// //                 <h3 className="text-lg font-semibold">{caseItem.name}</h3>
// //                 <span className="text-sm text-gray-500">{caseItem.dateOfVisit}</span>
// //               </div>
// //               <p><strong>Age:</strong> {caseItem.age}</p>
// //               <p><strong>Gender:</strong> {caseItem.gender}</p>
// //               <p><strong>Phone:</strong> {caseItem.phone}</p>
// //               <p className="mt-2 text-gray-700"><strong>Complaints:</strong> {caseItem.chiefComplaints}</p>
// //               <button className="mt-4 w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700 transition">
// //                 View Full Case
// //               </button>
// //             </div>
// //           ))}
// //         </div>
// //       )}
// //     </div>
// //   );
// // };

// // export default CasesList;
// import React, { useEffect, useState } from "react";

// const CasesList = () => {
//   const [cases, setCases] = useState([]);

//   useEffect(() => {
//     const fetchCases = async () => {
//       try {
//         const response = await fetch("http://localhost:5000/api/cases");
//         const data = await response.json();
//         console.log("Fetched cases:", data); // Add this line
//         setCases(data);
//       } catch (error) {
//         console.error("Error fetching cases:", error);
//       }
//     };
//     fetchCases();
//   }, []);
  
//   return (
//     <div className="max-w-5xl mx-auto p-4">
//       <h2 className="text-2xl font-bold text-center mb-6">All Cases</h2>

//       {cases.length === 0 ? (
//         <p className="text-center text-gray-500">No cases available.</p>
//       ) : (
//         <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//           {cases.map((caseItem, index) => (
//            <div
//            key={caseItem.id || index}
//            className="bg-white shadow-md rounded-lg p-4 hover:shadow-lg transition"
//          >
//            <div className="flex justify-between mb-2">
//              <h3 className="text-lg font-semibold">{caseItem.name}</h3>
//            </div>
//            <p><strong>Age:</strong> {caseItem.age}</p>
//            <p><strong>Gender:</strong> {caseItem.gender}</p>
//            <p><strong>Phone:</strong> {caseItem.phone}</p>
//            <p>
//              <strong>Complaints:</strong>{" "}
//              {Array.isArray(caseItem.chiefComplaints) && caseItem.chiefComplaints.length > 0
//                ? caseItem.chiefComplaints.map(c => c.complaint).join(", ")
//                : "N/A"}
//            </p>
         
//            <button className="mt-4 w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700 transition">
//              View Full Case
//            </button>
//          </div>
         
//           ))}
          
//         </div>
//       )}
//     </div>
//   );
// };

// export default CasesList;
import React, { useState, useEffect } from "react";
// import axios from "axios"; // Import Axios

const CasesList = () => {
  const [cases, setCases] = useState([]); // State to store the list of cases
  const [loading, setLoading] = useState(true); // Loading state

  useEffect(() => {
    // Fetch all cases when the component mounts
    const fetchCases = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/cases"); // Replace with your backend URL
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

export default CasesList;
