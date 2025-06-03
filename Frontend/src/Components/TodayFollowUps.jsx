import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const TodayFollowUps = () => {
  const [followUps, setFollowUps] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    fetchFollowUps();
  }, []);

  const fetchFollowUps = () => {
    fetch('http://localhost:5000/api/followups/today')  // Corrected API endpoint
      .then((response) => response.json())
      .then((data) => {
        setFollowUps(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching follow-ups:', error);
        setLoading(false);
      });
  };

  const handleEdit = (followUpId) => {
    navigate(`/followups/edit/${followUpId}`);  // Navigating to the correct edit route
  };

  const handleDelete = (followUpId) => {
    if (window.confirm('Are you sure you want to delete this follow-up?')) {
      fetch(`http://localhost:5000/api/followups/${followUpId}`, {
        method: 'DELETE',
      })
        .then((res) => {
          if (res.ok) {
            fetchFollowUps(); // Refresh the list after deletion
          } else {
            console.error('Failed to delete follow-up');
          }
        })
        .catch((error) => console.error('Error deleting follow-up:', error));
    }
  };

  return (
    <div style={{ padding: '20px' }}>
      <h3>Today's Follow-Ups</h3>
      {loading ? (
        <p>Loading follow-ups...</p>
      ) : followUps.length > 0 ? (
        <ul style={{ listStyleType: 'none', padding: 0 }}>
          {followUps.map((followUp) => (
            <li
              key={followUp._id}
              style={{
                border: '1px solid #ccc',
                borderRadius: '8px',
                marginBottom: '15px',
                padding: '10px',
              }}
            >
              <strong>Name:</strong> {followUp.caseName || 'N/A'} <br />
              <strong>Phone:</strong> {followUp.phoneNumber || 'N/A'} <br />
              <strong>Complaints:</strong> {followUp.complaints || 'N/A'} <br />
              <strong>Prescription:</strong> {followUp.prescription || 'N/A'} <br />
              <strong>Remarks:</strong> {followUp.remarks || 'N/A'} <br />
              <strong>Date:</strong>{' '}
              {followUp.date ? new Date(followUp.date).toLocaleDateString() : 'N/A'}
              <br />
              <button
                onClick={() => handleEdit(followUp._id)}  // Editing the correct follow-up
                style={{ marginRight: '10px', marginTop: '10px' }}
              >
                Edit
              </button>
              <button
                onClick={() => handleDelete(followUp._id)}
                style={{ backgroundColor: 'red', color: 'white', marginTop: '10px' }}
              >
                Delete
              </button>
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
