/** @format */

import React, { useState } from "react";
import FollowUpForm from "./FollowUpForm";
import FollowUpList from "./FollowUpList";

const FollowUpPage = () => {
  const [followUps, setFollowUps] = useState([]);

  // Add new follow-up to the list
  const handleAddFollowUp = (data) => {
    setFollowUps((prev) => [
      ...prev,
      {
        ...data,
        id: Date.now(), // unique id
      },
    ]);
  };

  return (
    <div>
      <FollowUpForm onSubmit={handleAddFollowUp} />
      <FollowUpList followUps={followUps} />
    </div>
  );
};

export default FollowUpPage;
