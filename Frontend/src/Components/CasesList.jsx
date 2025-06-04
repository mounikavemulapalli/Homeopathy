/** @format */

import React, { useEffect, useState } from "react";
import axios from "axios";
import CaseDetailsTable from "./CaseDetailsTable"; // ensure the file exists

const CasesList = () => {
  const [cases, setCases] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCases = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/cases"); // Replace with your backend URL
        setCases(res.data);
      } catch (err) {
        console.error("Error fetching cases:", err);
        setError("Unable to fetch cases");
      }
    };
    fetchCases();
  }, []);

  if (error) return <p>{error}</p>;
  if (!cases.length) return <p>No cases found</p>;

  return (
    <div>
      {cases.map((data) => (
        <CaseDetailsTable key={data._id} data={data} />
      ))}
    </div>
  );
};

export default CasesList;
