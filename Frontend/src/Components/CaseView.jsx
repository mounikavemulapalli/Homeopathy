/** @format */

// /** @format */

// import React, { useState, useEffect } from "react";
// import axios from "axios";

// const ViewCases = () => {
//   const [cases, setCases] = useState([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const fetchCases = async () => {
//       try {
//         const response = await axios.get("http://localhost:5000/api/cases");
//         setCases(response.data);
//       } catch (error) {
//         console.error("Error fetching cases:", error);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchCases();
//   }, []);

//   if (loading) return <div className='text-center py-10'>Loading...</div>;

//   return (
//     <div className='max-w-5xl mx-auto p-6 font-sans'>
//       <h2 className='text-3xl font-bold mb-6 text-center text-blue-800'>
//         All Case Sheets
//       </h2>

//       {cases.length === 0 ? (
//         <p className='text-center text-gray-600'>No cases found.</p>
//       ) : (
//         cases.map((caseItem, index) => (
//           <div
//             key={caseItem._id || index}
//             className='border rounded-lg p-6 mb-10 shadow-md bg-white'
//           >
//             <h3 className='text-xl font-semibold mb-4 text-blue-700'>
//               Patient #{index + 1}
//             </h3>

//             <p>
//               <strong>Name:</strong> {caseItem.name}
//             </p>
//             <p>
//               <strong>Age:</strong> {caseItem.age}
//             </p>
//             <p>
//               <strong>Gender:</strong> {caseItem.gender}
//             </p>
//             <p>
//               <strong>Phone:</strong> {caseItem.phone}
//             </p>
//             <p>
//               <strong>Date of Visit:</strong>{" "}
//               {new Date(caseItem.dateOfVisit).toLocaleDateString()}
//             </p>

//             {caseItem.imageUrl && (
//               <img
//                 src={`http://localhost:5000${caseItem.imageUrl}`}
//                 alt='Uploaded'
//                 className='w-32 mt-4 border rounded'
//               />
//             )}

//             <div className='mt-4'>
//               <h4 className='font-semibold underline'>Symptoms & Remedy</h4>
//               <p>
//                 <strong>Symptoms:</strong>{" "}
//                 {caseItem.chiefComplaints && caseItem.chiefComplaints.length > 0
//                   ? caseItem.chiefComplaints
//                       .map((cc) => cc.description)
//                       .filter(Boolean)
//                       .join("; ")
//                   : "N/A"}
//               </p>
//               <p>
//                 <strong>Remedy Given:</strong>{" "}
//                 {caseItem.prescription && caseItem.prescription.length > 0
//                   ? caseItem.prescription[0].remedyName
//                   : "N/A"}
//               </p>
//             </div>

//             {caseItem.prescription?.length > 0 && (
//               <div className='mt-4'>
//                 <h4 className='font-semibold underline'>Prescriptions</h4>
//                 {caseItem.prescription.map((presc, idx) => (
//                   <div key={idx} className='ml-4 mb-2'>
//                     <p>
//                       <strong>Date:</strong>{" "}
//                       {presc.date
//                         ? new Date(presc.date).toLocaleDateString()
//                         : "N/A"}
//                     </p>
//                     <p>
//                       <strong>Remedy:</strong> {presc.remedyName || "N/A"}
//                     </p>
//                     <p>
//                       <strong>Potency:</strong> {presc.potency || "N/A"}
//                     </p>
//                     <p>
//                       <strong>Dose:</strong> {presc.dose || "N/A"}
//                     </p>
//                     <p>
//                       <strong>Instructions:</strong>{" "}
//                       {presc.instructions || "N/A"}
//                     </p>
//                   </div>
//                 ))}
//               </div>
//             )}

//             {caseItem.chiefComplaints?.length > 0 && (
//               <div className='mt-4'>
//                 <h4 className='font-semibold underline'>Chief Complaints</h4>
//                 {caseItem.chiefComplaints.map((cc, idx) => (
//                   <div key={idx} className='ml-4 mb-3'>
//                     <p>
//                       <strong>Complaint:</strong> {cc.complaint}
//                     </p>
//                     <p>
//                       <strong>Duration:</strong> {cc.duration}
//                     </p>
//                     <p>
//                       <strong>Description:</strong> {cc.description}
//                     </p>
//                     <p>
//                       <strong>Modalities:</strong> {cc.modalities || "N/A"}
//                     </p>
//                     {cc.skinImageUrl && (
//                       <img
//                         src={`http://localhost:5000${cc.skinImageUrl}`}
//                         alt='Skin'
//                         className='w-24 border mt-2'
//                       />
//                     )}
//                   </div>
//                 ))}
//               </div>
//             )}

//             {caseItem.personalHistory && (
//               <div className='mt-4'>
//                 <h4 className='font-semibold underline'>Personal History</h4>
//                 <ul className='list-disc ml-6'>
//                   <li>
//                     <strong>Appetite:</strong>{" "}
//                     {caseItem.personalHistory.appetite}
//                   </li>
//                   <li>
//                     <strong>Cravings/Aversions:</strong>{" "}
//                     {caseItem.personalHistory.cravingsAversions}
//                   </li>
//                   <li>
//                     <strong>Thirst:</strong> {caseItem.personalHistory.thirst}
//                   </li>
//                   <li>
//                     <strong>Bowel:</strong> {caseItem.personalHistory.bowel}
//                   </li>
//                   <li>
//                     <strong>Urine:</strong> {caseItem.personalHistory.urine}
//                   </li>
//                   <li>
//                     <strong>Sleep:</strong> {caseItem.personalHistory.sleep}
//                   </li>
//                   <li>
//                     <strong>Dreams:</strong> {caseItem.personalHistory.dreams}
//                   </li>
//                   <li>
//                     <strong>Sweat:</strong> {caseItem.personalHistory.sweat}
//                   </li>
//                   <li>
//                     <strong>Thermal:</strong> {caseItem.personalHistory.thermal}
//                   </li>
//                   <li>
//                     <strong>Habits:</strong> {caseItem.personalHistory.habits}
//                   </li>
//                   <li>
//                     <strong>Menstrual:</strong>{" "}
//                     {caseItem.personalHistory.menstrual}
//                   </li>
//                 </ul>
//               </div>
//             )}

//             {caseItem.pastHistory && (
//               <div className='mt-4'>
//                 <h4 className='font-semibold underline'>Past History</h4>
//                 <p>
//                   <strong>Childhood Diseases:</strong>{" "}
//                   {caseItem.pastHistory.childhoodDiseases || "N/A"}
//                 </p>
//                 <p>
//                   <strong>Surgeries/Injuries:</strong>{" "}
//                   {caseItem.pastHistory.surgeriesInjuries || "N/A"}
//                 </p>
//                 <p>
//                   <strong>Major Illnesses:</strong>{" "}
//                   {caseItem.pastHistory.majorIllnesses || "N/A"}
//                 </p>
//               </div>
//             )}
//           </div>
//         ))
//       )}
//     </div>
//   );
// };

// export default ViewCases;
import React, { useState, useEffect } from "react";
import axios from "axios";

const ViewCases = () => {
  const [cases, setCases] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCases = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/cases");
        setCases(response.data);
      } catch (error) {
        console.error("Error fetching cases:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCases();
  }, []);

  if (loading) return <div className='text-center py-10'>Loading...</div>;

  return (
    <div className='max-w-5xl mx-auto p-6 font-sans'>
      <h2 className='text-3xl font-bold mb-6 text-center text-blue-800'>
        All Case Sheets
      </h2>

      {cases.length === 0 ? (
        <p className='text-center text-gray-600'>No cases found.</p>
      ) : (
        cases.map((caseItem, index) => (
          <div
            key={caseItem._id || index}
            className='border rounded-lg p-6 mb-10 shadow-md bg-white'
          >
            <h3 className='text-xl font-semibold mb-4 text-blue-700'>
              Patient #{index + 1}
            </h3>

            <p>
              <strong>Name:</strong> {caseItem.name}
            </p>
            <p>
              <strong>Age:</strong> {caseItem.age}
            </p>
            <p>
              <strong>Gender:</strong> {caseItem.gender}
            </p>
            <p>
              <strong>Phone:</strong> {caseItem.phone}
            </p>
            <p>
              <strong>Date of Visit:</strong>{" "}
              {new Date(caseItem.dateOfVisit).toLocaleDateString()}
            </p>

            {caseItem.symptoms && (
              <p>
                <strong>Symptoms:</strong> {caseItem.symptoms}
              </p>
            )}

            {caseItem.remedyGiven && (
              <p>
                <strong>Remedy Given:</strong> {caseItem.remedyGiven}
              </p>
            )}

            {caseItem.prescriptions?.length > 0 && (
              <div className='mt-4'>
                <h4 className='font-semibold underline'>Prescriptions</h4>
                <table className='w-full text-sm border mt-2'>
                  <thead>
                    <tr className='bg-gray-100'>
                      <th className='border p-1'>Date</th>
                      <th className='border p-1'>Remedy</th>
                      <th className='border p-1'>Potency</th>
                      <th className='border p-1'>Dose</th>
                      <th className='border p-1'>Instructions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {caseItem.prescriptions.map((presc, idx) => (
                      <tr key={idx}>
                        <td className='border p-1'>
                          {new Date(presc.date).toLocaleDateString()}
                        </td>
                        <td className='border p-1'>{presc.remedyName}</td>
                        <td className='border p-1'>{presc.potency}</td>
                        <td className='border p-1'>{presc.dose}</td>
                        <td className='border p-1'>{presc.instructions}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        ))
      )}
    </div>
  );
};

export default ViewCases;
