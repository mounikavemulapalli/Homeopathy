/** @format */

import React, { useEffect, useState } from "react";

const TodayFollowUps = () => {
  const [followUps, setFollowUps] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingId, setEditingId] = useState(null);
  const [editForm, setEditForm] = useState({});

  useEffect(() => {
    fetchFollowUps();
  }, []);

  const fetchFollowUps = () => {
    fetch("http://localhost:5000/api/followups/today")
      .then((res) => res.json())
      .then((data) => {
        setFollowUps(data);
        setLoading(false);
      });
  };

  const handleDelete = (id) => {
    if (window.confirm("Delete this follow-up?")) {
      fetch(`http://localhost:5000/api/followups/${id}`, {
        method: "DELETE",
      }).then(() => fetchFollowUps());
    }
  };

  const handleEdit = (followUp) => {
    setEditingId(followUp._id);
    setEditForm({ ...followUp });
  };

  const handleEditChange = (field, value) => {
    setEditForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleEditSave = (id) => {
    fetch(`http://localhost:5000/api/followups/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(editForm),
    }).then(() => {
      setEditingId(null);
      fetchFollowUps();
    });
  };

  return (
    <div style={{ padding: "20px" }}>
      <h3>Today's Follow-Ups</h3>
      {loading ? (
        <p>Loading follow-ups...</p>
      ) : followUps.length > 0 ? (
        <ul style={{ listStyleType: "none", padding: 0 }}>
          {followUps.map((followUp) => (
            <li
              key={followUp._id}
              style={{
                border: "1px solid #ccc",
                borderRadius: "8px",
                marginBottom: "15px",
                padding: "10px",
              }}
            >
              {editingId === followUp._id ? (
                <>
                  <input
                    value={editForm.patientName}
                    onChange={(e) =>
                      handleEditChange("patientName", e.target.value)
                    }
                    placeholder='Name'
                  />
                  <br />
                  <input
                    value={editForm.phoneNumber}
                    onChange={(e) =>
                      handleEditChange("phoneNumber", e.target.value)
                    }
                    placeholder='Phone'
                  />
                  <br />
                  <input
                    value={editForm.complaint}
                    onChange={(e) =>
                      handleEditChange("complaint", e.target.value)
                    }
                    placeholder='Complaint'
                  />
                  <br />
                  <input
                    value={editForm.complaints}
                    onChange={(e) =>
                      handleEditChange("complaints", e.target.value)
                    }
                    placeholder='Complaints'
                  />
                  <br />
                  <input
                    value={editForm.prescription}
                    onChange={(e) =>
                      handleEditChange("prescription", e.target.value)
                    }
                    placeholder='Prescription'
                  />
                  <br />
                  <input
                    value={editForm.remarks}
                    onChange={(e) =>
                      handleEditChange("remarks", e.target.value)
                    }
                    placeholder='Remarks'
                  />
                  <br />
                  <input
                    type='date'
                    value={editForm.date}
                    onChange={(e) => handleEditChange("date", e.target.value)}
                  />
                  <br />
                  <button
                    onClick={() => handleEditSave(followUp._id)}
                    style={{ marginRight: 10 }}
                  >
                    Save
                  </button>
                  <button onClick={() => setEditingId(null)}>Cancel</button>
                </>
              ) : (
                <>
                  <strong>Name:</strong> {followUp.patientName || "N/A"} <br />
                  <strong>Phone:</strong> {followUp.phoneNumber || "N/A"} <br />
                  <strong>Complaint:</strong>{" "}
                  {followUp.complaint || followUp.complaints || "N/A"} <br />
                  <strong>Prescription:</strong>{" "}
                  {followUp.prescription || "N/A"} <br />
                  <strong>Remarks:</strong> {followUp.remarks || "N/A"} <br />
                  <strong>Date:</strong>{" "}
                  {followUp.date
                    ? new Date(followUp.date).toLocaleDateString()
                    : "N/A"}
                  <br />
                  <button
                    onClick={() => handleEdit(followUp)}
                    style={{ marginRight: "10px", marginTop: "10px" }}
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(followUp._id)}
                    style={{
                      backgroundColor: "red",
                      color: "white",
                      marginTop: "10px",
                    }}
                  >
                    Delete
                  </button>
                </>
              )}
            </li>
          ))}
        </ul>
      ) : (
        <p>No follow-ups for today!</p>
      )}
    </div>
  );
};

export default TodayFollowUps;
