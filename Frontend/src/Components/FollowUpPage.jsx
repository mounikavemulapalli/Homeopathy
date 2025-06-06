/** @format */

import React, { useState, useEffect } from "react";
import FollowUpForm from "./FollowUpForm";

const FollowUpPage = () => {
  const [followUps, setFollowUps] = useState([]);
  const [cases, Setcases] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("http://localhost:5000/api/cases")
      .then((res) => res.json())
      .then((data) => {
        setCases(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
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
  useEffect(() => {
    fetch("http://localhost:5000/api/followups")
      .then((res) => res.json())
      .then((data) => setFollowUps(data));
  }, []);
  // Get today's date in YYYY-MM-DD format
  const today = new Date().toISOString().slice(0, 10);
  const todaysFollowUps = followUps.filter((f) => f.date === today);

  if (loading) {
    return <div className='text-center mt-8'>Loading cases...</div>;
  }

  return (
    <div>
      <FollowUpForm onSubmit={handleAddFollowUp} cases={cases} />

      <div className='max-w-2xl mx-auto mt-8'>
        <h2 className='text-lg font-bold mb-2 text-green-700'>
          Today's Consultations
        </h2>
        {todaysFollowUps.length === 0 ? (
          <div className='text-gray-500 text-center'>
            No consultations for today.
          </div>
        ) : (
          <ul className='space-y-4'>
            {todaysFollowUps.map((item) => (
              <li
                key={item.id}
                className='bg-green-50 shadow rounded p-4 border border-green-200'
              >
                <div className='flex justify-between items-center mb-2'>
                  <span className='font-semibold'>
                    {item.casesName}{" "}
                    <span className='text-xs text-gray-500'>
                      (ID: {item.casesId})
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
      </div>

      <FollowUpList followUps={followUps} />
    </div>
  );
};

export default FollowUpPage;
