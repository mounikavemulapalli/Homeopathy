import React, { useEffect, useState } from "react";

const FollowUpList = () => {
  const [followUps, setFollowUps] = useState([]);

  // Dummy data for now — replace with real API data
  useEffect(() => {
    const dummyFollowUps = [
      {
        id: 1,
        patientName: "Ravi Kumar",
        date: "2025-05-12",
        symptoms: "Improved sleep, reduced anxiety",
        notes: "Continue same remedy. Next follow-up in 1 week.",
      },
      {
        id: 2,
        patientName: "Sita Devi",
        date: "2025-05-11",
        symptoms: "Joint pain slightly better",
        notes: "Increase potency, observe for 3 days.",
      },
    ];
    setFollowUps(dummyFollowUps);
  }, []);

  return (
    <div className="max-w-5xl mx-auto p-4">
      <h2 className="text-2xl font-bold text-center mb-6">Follow-Up List</h2>

      {followUps.length === 0 ? (
        <p className="text-center text-gray-500">No follow-ups found.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {followUps.map((item) => (
            <div
              key={item.id}
              className="bg-white shadow-md rounded-lg p-4 hover:shadow-lg transition"
            >
              <div className="flex justify-between mb-2">
                <h3 className="text-lg font-semibold">{item.patientName}</h3>
                <span className="text-sm text-gray-500">{item.date}</span>
              </div>
              <p className="text-gray-700"><strong>Symptoms:</strong> {item.symptoms}</p>
              <p className="mt-2 text-gray-700"><strong>Notes:</strong> {item.notes}</p>
              <button className="mt-4 w-full bg-green-600 text-white p-2 rounded hover:bg-green-700 transition">
                View Follow-Up
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default FollowUpList;
