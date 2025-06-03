import React, { useState, useEffect } from "react";

const FollowUps = () => {
  const [followUps, setFollowUps] = useState([]);

  useEffect(() => {
    // Dummy data — replace with API call if needed
    const dummyFollowUps = [
      {
        id: 1,
        patientName: "Ravi Kumar",
        date: "2025-05-12",
        complaint: "Headache persists, better with rest",
        prescription: "Belladonna 200C, once daily",
      },
      {
        id: 2,
        patientName: "Sita Devi",
        date: "2025-05-11",
        complaint: "Cough improved but fatigue remains",
        prescription: "Bryonia 30C, twice daily",
      },
    ];
    setFollowUps(dummyFollowUps);
  }, []);

  return (
    <div className="p-4 max-w-4xl mx-auto">
      <h2 className="text-2xl font-bold text-center mb-6">Follow-Up List</h2>
      {followUps.length === 0 ? (
        <p className="text-center">No follow-ups available.</p>
      ) : (
        <div className="space-y-4">
          {followUps.map((item) => (
            <div key={item.id} className="p-4 border rounded shadow-sm bg-white">
              <p><strong>Patient:</strong> {item.patientName}</p>
              <p><strong>Date:</strong> {item.date}</p>
              <p><strong>Complaint:</strong> {item.complaint}</p>
              <p><strong>Prescription:</strong> {item.prescription}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default FollowUps;
