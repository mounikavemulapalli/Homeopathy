/** @format */

// In src/Components/FollowUps.jsx
import React, { useEffect, useState } from "react";

const FollowUps = () => {
  const [followUps, setFollowUps] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/api/followups")
      .then((res) => res.json())
      .then((data) => setFollowUps(data))
      .catch(() => setFollowUps([]));
  }, []);

  return (
    <div>
      <h2>Follow-Up Cases</h2>
      <ul>
        {followUps.map((fu) => (
          <li key={fu._id}>
            {fu.patientName} - {fu.phoneNumber} - {fu.date?.slice(0, 10)}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default FollowUps;
