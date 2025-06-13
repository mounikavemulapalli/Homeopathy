/** @format */

import React, { useState, useEffect } from "react";
import FollowUpForm from "./FollowUpForm";
import FollowUps from "./FollowUps"; // Corrected import

const FollowUpPage = () => {
  const [followUps, setFollowUps] = useState([]);
  const [cases, setCases] = useState([]); // Corrected Setcases to setCases
  const [loading, setLoading] = useState(true);
  const [autoExpectedFollowUps, setAutoExpectedFollowUps] = useState([]);
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().slice(0, 10)); // State for selected date

  useEffect(() => {
    const fetchCasesAndFollowUps = async () => {
      setLoading(true);
      try {
        const casesRes = await fetch("http://localhost:5000/api/cases");
        const casesData = await casesRes.json();
        setCases(casesData);
  
        const followUpsRes = await fetch("http://localhost:5000/api/followups");
        const followUpsData = await followUpsRes.json();
        setFollowUps(followUpsData);
  
        // ✅ Fix: Properly map and then set
        const allAutoExpected = casesData
          .filter((item) => item.dateOfVisit)
          .map((item) => {
            const visitDate = new Date(item.dateOfVisit);
            visitDate.setDate(visitDate.getDate() + 15);
            return {
              ...item,
              expectedFollowUpDate: visitDate.toISOString().split("T")[0],
              patientName: item.name || "",
              phoneNumber: item.phone || "",
            };
          });
  
        setAutoExpectedFollowUps(allAutoExpected); // ✅ Move here
  
      } catch (err) {
        console.error("Error fetching data:", err);
      } finally {
        setLoading(false);
      }
    };
  
    fetchCasesAndFollowUps();
  }, []);
  

  const handleAddFollowUp = (data) => {
    fetch("http://localhost:5000/api/followups", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    })
      .then((res) => res.json())
      .then((savedFollowUp) => {
        setFollowUps((prev) => [...prev, savedFollowUp]);
      })
      .catch((err) => {
        alert("Failed to save follow-up!");
        console.error(err);
      });
  };
  const handleDelete = async (id) => {
    if (!window.confirm("Delete this follow-up?")) return;
    try {
      await fetch(`http://localhost:5000/api/followups/${id}`, {
        method: "DELETE",
      });
      setFollowUps((prev) => prev.filter((f) => f._id !== id));
    } catch (err) {
      alert("Delete failed!");
    }
  };
  
  const handleEdit = (id) => {
    const toEdit = followUps.find((f) => f._id === id);
    if (toEdit) {
      setEditingFollowUp(toEdit); // Create state to hold current item being edited
    }
  };
  
  // Filter follow-ups based on selectedDate
  const filteredTodaysFollowUps = followUps.filter(
    (f) => f.date === selectedDate
  );

  const filteredAutoExpectedFollowUps = autoExpectedFollowUps.filter(
    (item) => item.expectedFollowUpDate === selectedDate
  );

  if (loading) {
    return <div className='text-center mt-8'>Loading cases...</div>;
  }

  return (
    <div>
      <FollowUpForm onSubmit={handleAddFollowUp} cases={cases} />

      <div className='max-w-2xl mx-auto mt-8'>
        <h2 className='text-lg font-bold mb-2 text-gray-800'>
          Select Date for Follow-ups
        </h2>
        <input
          type='date'
          value={selectedDate}
          onChange={(e) => setSelectedDate(e.target.value)}
          className='p-2 border border-gray-300 rounded-md mb-4'
        />

        <h2 className='text-lg font-bold mb-2 text-green-700'>
          Consultations for {selectedDate}
        </h2>
        {filteredTodaysFollowUps.length === 0 ? (
          <div className='text-gray-500 text-center'>
            No consultations for {selectedDate}.
          </div>
        ) : (
          <ul className='space-y-4'>
            {filteredTodaysFollowUps.map((item) => (
              <li
                key={item._id} // Assuming _id is the unique identifier
                className='bg-green-50 shadow rounded p-4 border border-green-200'
              >
                <div className='flex justify-between items-center mb-2'>
                  <span className='font-semibold'>
                    {item.patientName}{/* Added patientName */}
                    <span className='text-xs text-gray-500'>
                      (ID: {item.casesId}) - {item.phoneNumber}{/* Added phoneNumber */}
                    </span>
                  </span>
                  <span className='text-sm text-gray-500'>{item.date}</span>
                </div>
                <div>
                  <strong>Complaint/Progress:</strong>
                  <div className='ml-2'>{item.complaint}</div>
                </div>
                <div className='mt-2'>
                  <strong>Prescription:</strong>
                  <div className='ml-2'>{item.prescription}</div>
                </div>
              </li>
            ))}
          </ul>
        )}

        <h2 className='text-lg font-bold mb-2 mt-8 text-blue-700'>
          Auto-Expected Follow-ups for {selectedDate} (15 days after visit)
        </h2>
        {filteredAutoExpectedFollowUps.length === 0 ? (
          <div className='text-gray-500 text-center'>
            No auto-expected follow-ups for {selectedDate}.
          </div>
        ) : (
          <ul className='space-y-4'>
            {filteredAutoExpectedFollowUps.map((item) => (
              <li
                key={item._id} // Assuming _id is the unique identifier for cases
                className='bg-blue-50 shadow rounded p-4 border border-blue-200'
              >
                <div className='flex justify-between items-center mb-2'>
                  <span className='font-semibold'>
                    {item.patientName}{' '}
                    <span className='text-xs text-gray-500'>
                      (Case ID: {item.caseId}) - {item.phoneNumber}
                    </span>
                  </span>
                  <span className='text-sm text-gray-500'>
                    Visit Date: {item.dateOfVisit}
                  </span>
                </div>
                <div>
                  <strong>Complaint:</strong>
                  <div className='ml-2'>
                    {item.chiefComplaints && item.chiefComplaints.length > 0
                      ? item.chiefComplaints[0].complaint
                      : "N/A"}
                  </div>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* Render the FollowUps component with all follow-ups for the selected date */}
      <FollowUps
        followUps={[
          ...filteredTodaysFollowUps,
          ...filteredAutoExpectedFollowUps,
        ]}
        title={`All Follow-ups for ${selectedDate}`}
      />
    </div>
  );
};

export default FollowUpPage;
