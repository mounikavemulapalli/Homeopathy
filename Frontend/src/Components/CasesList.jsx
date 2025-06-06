/** @format */

import React, { useEffect, useState } from "react";
import axios from "axios";

const CasesList = () => {
  const [cases, setCases] = useState([]);
  const [error, setError] = useState(null);
  const [editId, setEditId] = useState(null);
  const [editName, setEditName] = useState("");
  const [editPhone, setEditPhone] = useState("");
  const [searchName, setSearchName] = useState("");
  const [searchPhone, setSearchPhone] = useState("");

  useEffect(() => {
    const fetchCases = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/cases");
        setCases(res.data);
      } catch (err) {
        console.error("Error fetching cases:", err);
        setError("Unable to fetch cases");
      }
    };
    fetchCases();
  }, []);

  const handleEdit = (id) => {
    const caseToEdit = cases.find((c) => c._id === id);
    setEditId(id);
    setEditName(caseToEdit.name || caseToEdit.patientName || "");
    setEditPhone(caseToEdit.phone || caseToEdit.phoneNumber || "");
  };

  const handleSave = async (id) => {
    try {
      await axios.put(`http://localhost:5000/api/cases/${id}`, {
        name: editName,
        phone: editPhone,
      });
      setCases((prev) =>
        prev.map((c) =>
          c._id === id ? { ...c, name: editName, phone: editPhone } : c
        )
      );
      setEditId(null);
    } catch (err) {
      alert("Failed to update case");
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this case?")) {
      try {
        await axios.delete(`http://localhost:5000/api/cases/${id}`);
        setCases((prev) => prev.filter((c) => c._id !== id));
      } catch (err) {
        alert("Failed to delete case");
      }
    }
  };

  // Filter cases by search
  const filteredCases = cases.filter((data) => {
    const name = (data.name || data.patientName || "").toLowerCase();
    const phone = data.phone || data.phoneNumber || "";
    return (
      name.includes(searchName.toLowerCase()) && phone.includes(searchPhone)
    );
  });

  if (error) return <p>{error}</p>;
  if (!cases.length) return <p>No cases found</p>;

  return (
    <div className='max-w-2xl mx-auto mt-8'>
      <h2 className='text-lg font-bold mb-4 text-center'>All Cases</h2>
      <div className='flex gap-4 mb-4'>
        <input
          type='text'
          placeholder='Search by name'
          value={searchName}
          onChange={(e) => setSearchName(e.target.value)}
          className='border px-2 py-1 rounded w-1/2'
        />
        <input
          type='text'
          placeholder='Search by phone'
          value={searchPhone}
          onChange={(e) => setSearchPhone(e.target.value)}
          className='border px-2 py-1 rounded w-1/2'
        />
      </div>
      <table className='min-w-full border border-gray-300 rounded'>
        <thead>
          <tr className='bg-blue-100'>
            <th className='py-2 px-4 border'>#</th>
            <th className='py-2 px-4 border'>Name</th>
            <th className='py-2 px-4 border'>Phone Number</th>
            <th className='py-2 px-4 border'>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredCases.map((data, idx) => (
            <tr key={data._id} className='text-center hover:bg-blue-50'>
              <td className='py-2 px-4 border'>{idx + 1}</td>
              <td className='py-2 px-4 border'>
                {editId === data._id ? (
                  <input
                    value={editName}
                    onChange={(e) => setEditName(e.target.value)}
                    className='border px-2 py-1'
                  />
                ) : (
                  data.name || data.patientName || "N/A"
                )}
              </td>
              <td className='py-2 px-4 border'>
                {editId === data._id ? (
                  <input
                    value={editPhone}
                    onChange={(e) => setEditPhone(e.target.value)}
                    className='border px-2 py-1'
                  />
                ) : (
                  data.phone || data.phoneNumber || "N/A"
                )}
              </td>
              <td className='py-2 px-4 border'>
                {editId === data._id ? (
                  <>
                    <button
                      className='text-green-600 hover:underline mr-3'
                      onClick={() => handleSave(data._id)}
                    >
                      Save
                    </button>
                    <button
                      className='text-gray-600 hover:underline'
                      onClick={() => setEditId(null)}
                    >
                      Cancel
                    </button>
                  </>
                ) : (
                  <>
                    <button
                      className='text-blue-600 hover:underline mr-3'
                      onClick={() => handleEdit(data._id)}
                    >
                      Edit
                    </button>
                    <button
                      className='text-red-600 hover:underline'
                      onClick={() => handleDelete(data._id)}
                    >
                      Delete
                    </button>
                  </>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CasesList;
