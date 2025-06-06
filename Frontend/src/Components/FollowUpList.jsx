/** @format */

import React from "react";

const FollowUpList = ({ followUps }) => (
  <div className='max-w-2xl mx-auto mt-8'>
    <h2 className='text-xl font-bold mb-4 text-blue-700'>Follow-Up History</h2>
    {!followUps || followUps.length === 0 ? (
      <div className='text-gray-500 text-center'>No follow-ups yet.</div>
    ) : (
      <ul className='space-y-4'>
        {followUps.map((item) => (
          <li key={item.id} className='bg-white shadow rounded p-4 border'>
            <div className='flex justify-between items-center mb-2'>
              <span className='font-semibold'>{item.patientName}</span>
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
);

export default FollowUpList;
