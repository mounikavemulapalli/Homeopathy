/** @format */

import React from "react";

const FollowUps = ({ followUps = [], title = "" }) => {
  return (
    <div className="max-w-4xl mx-auto mt-10">
      <h2 className="text-xl font-bold mb-4 text-purple-700">{title}</h2>

      {followUps.length === 0 ? (
        <p className="text-gray-500 text-center">No follow-up entries.</p>
      ) : (
        <ul className="space-y-4">
          {followUps.map((item) => (
            <li
              key={item._id}
              className="bg-white border shadow p-4 rounded-lg"
            >
              <div className="flex justify-between items-center mb-2">
                <span className="font-semibold text-lg">
                  {item.patientName || item.casesName || "Unnamed"}
                </span>
                <span className="text-sm text-gray-500">{item.date}</span>
              </div>

              <div className="text-sm text-gray-700">
                <p>
                  <strong>Phone:</strong>{" "}
                  {item.phoneNumber || item.phone || "N/A"}
                </p>
                <p className="mt-1">
                  <strong>Complaint:</strong>{" "}
                  {item.complaint ||
                    (item.chiefComplaints?.[0]?.complaint ?? "N/A")}
                </p>
              </div>

              {item.prescription && (
                <div className="mt-2">
                  <strong>Prescription:</strong>
                  <div className="ml-2 text-sm text-gray-800">
                    {item.prescription}
                  </div>
                </div>
              )}

              {item.remarks && (
                <div className="mt-2">
                  <strong>Remarks:</strong>
                  <div className="ml-2 text-sm text-gray-800">
                    {item.remarks}
                  </div>
                </div>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default FollowUps;
