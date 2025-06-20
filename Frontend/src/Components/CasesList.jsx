import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import Modal from './Modal'; // Make sure Modal.jsx and Modal.css exist

const CasesList = () => {
  const [cases, setCases] = useState([]);
  const [filteredCases, setFilteredCases] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCase, setSelectedCase] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [viewCase, setViewCase] = useState(null);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const casesPerPage = 5;

  // AI summary state
  const [aiSummary, setAiSummary] = useState('');
  const [loadingSummary, setLoadingSummary] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get('http://localhost:5000/api/cases');
        setCases(res.data);
        setFilteredCases(res.data);
      } catch (err) {
        toast.error('Failed to load cases.');
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    const term = searchTerm.toLowerCase();
    const filtered = cases.filter(
      (c) =>
        (c.name || '').toLowerCase().includes(term) ||
        (c.phone || '').includes(term)
    );
    setFilteredCases(filtered);
    setCurrentPage(1);
  }, [searchTerm, cases]);

  const indexOfLast = currentPage * casesPerPage;
  const indexOfFirst = indexOfLast - casesPerPage;
  const currentCases = filteredCases.slice(indexOfFirst, indexOfLast);
  const totalPages = Math.ceil(filteredCases.length / casesPerPage);

  const handleEditClick = (caseData) => {
    setSelectedCase(caseData);
    setAiSummary('');
    setIsModalOpen(true);
  };

  const handleViewClick = (caseData) => {
    setViewCase(caseData);
    setIsViewModalOpen(true);
  };

  const handleModalClose = () => {
    setSelectedCase(null);
    setIsModalOpen(false);
    setAiSummary('');
  };

  const handleFieldChange = (e) => {
    const { name, value } = e.target;
    setSelectedCase((prev) => ({ ...prev, [name]: value }));
  };

  const handleSaveCase = async () => {
    try {
      const res = await axios.put(
        `http://localhost:5000/api/cases/${selectedCase._id}`,
        selectedCase
      );
      setCases((prev) =>
        prev.map((c) => (c._id === res.data._id ? res.data : c))
      );
      toast.success('Case updated!');
      handleModalClose();
    } catch (err) {
      toast.error('Update failed.');
    }
  };

  const handleDeleteCase = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/cases/${id}`);
      setCases((prev) => prev.filter((c) => c._id !== id));
      toast.success('Deleted.');
    } catch {
      toast.error('Delete failed.');
    }
  };

  const handleAISuggestion = async () => {
    if (!selectedCase) return;
    setLoadingSummary(true);
    try {
      const res = await axios.post('http://localhost:5000/api/generate-summary', selectedCase);
      setAiSummary(res.data.summary || '');
    } catch (err) {
      toast.error('AI suggestion failed.');
      console.error(err);
    } finally {
      setLoadingSummary(false);
    }
  };

  return (
    <div>
      <h2>Cases</h2>
      <input
        type="text"
        placeholder="Search by name or phone"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />

      <table border="1" cellPadding="6">
        <thead>
          <tr>
            <th>Name</th>
            <th>Phone</th>
            <th>Age</th>
            <th>Gender</th>
            <th>Date of Visit</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {currentCases.map((c) => (
            <tr key={c._id}>
              <td>{c.name}</td>
              <td>{c.phone}</td>
              <td>{c.age}</td>
              <td>{c.gender}</td>
              <td>{new Date(c.dateOfVisit).toLocaleDateString()}</td>
              <td>
                <button onClick={() => handleViewClick(c)}>View</button>
                <button onClick={() => handleEditClick(c)}>Edit</button>
                <button onClick={() => handleDeleteCase(c._id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Pagination */}
      <div style={{ marginTop: '10px' }}>
        <button onClick={() => setCurrentPage(1)} disabled={currentPage === 1}>First</button>
        <button onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))} disabled={currentPage === 1}>Prev</button>
        {Array.from({ length: totalPages }, (_, i) => (
          <button
            key={i}
            onClick={() => setCurrentPage(i + 1)}
            style={{ fontWeight: currentPage === i + 1 ? 'bold' : 'normal' }}
          >
            {i + 1}
          </button>
        ))}
        <button onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))} disabled={currentPage === totalPages}>Next</button>
        <button onClick={() => setCurrentPage(totalPages)} disabled={currentPage === totalPages}>Last</button>
      </div>

      {/* Edit Modal */}
      {isModalOpen && selectedCase && (
        <Modal isOpen={isModalOpen} onClose={handleModalClose}>
          <h3>Edit Case</h3>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSaveCase();
            }}
          >
            {['name', 'phone', 'age', 'gender', 'symptoms', 'remedyGiven'].map((field) => (
              <div key={field}>
                <label>{field}:</label>
                <input
                  name={field}
                  value={selectedCase[field] || ''}
                  onChange={handleFieldChange}
                  type={field === 'age' ? 'number' : 'text'}
                />
              </div>
            ))}
            <label>Date of Visit:</label>
            <input
              type="date"
              name="dateOfVisit"
              value={
                selectedCase.dateOfVisit
                  ? new Date(selectedCase.dateOfVisit).toISOString().split('T')[0]
                  : ''
              }
              onChange={handleFieldChange}
            />

            {/* AI Summary Button */}
            <hr />
            <h4>AI Suggestion</h4>
            <button
              type="button"
              onClick={handleAISuggestion}
              disabled={loadingSummary}
              className="btn btn-info mb-2"
            >
              {loadingSummary ? 'Generating...' : 'Generate Summary'}
            </button>

            {/* Show summary */}
            {aiSummary && (
              <div className="mb-3">
                <label><strong>AI Summary:</strong></label>
                <textarea
                  className="form-control"
                  value={aiSummary}
                  readOnly
                  rows={6}
                />
              </div>
            )}

            <div>
              <button type="submit">Save</button>
              <button type="button" onClick={handleModalClose}>
                Cancel
              </button>
            </div>
          </form>
        </Modal>
      )}

      {/* View Modal */}
      {isViewModalOpen && viewCase && (
        <Modal isOpen={isViewModalOpen} onClose={() => setIsViewModalOpen(false)}>
          <h3>View Case</h3>
          <p><strong>Name:</strong> {viewCase.name}</p>
          <p><strong>Phone:</strong> {viewCase.phone}</p>
          <p><strong>Age:</strong> {viewCase.age}</p>
          <p><strong>Gender:</strong> {viewCase.gender}</p>
          <p><strong>Symptoms:</strong> {viewCase.symptoms}</p>
          <p><strong>Remedy Given:</strong> {viewCase.remedyGiven}</p>
          <p><strong>Date of Visit:</strong> {new Date(viewCase.dateOfVisit).toLocaleDateString()}</p>

          <h4>Chief Complaints</h4>
          {(viewCase.chiefComplaints || []).map((cc, i) => (
            <div key={i}>
              <p><strong>Complaint:</strong> {cc.complaint}</p>
              <p><strong>Duration:</strong> {cc.duration}</p>
              <p><strong>Description:</strong> {cc.description}</p>
              <p><strong>Modalities:</strong> {cc.modalities}</p>
              {cc.skinImage && <img src={cc.skinImage} alt="Skin" width="100" />}
            </div>
          ))}

          <h4>Prescriptions</h4>
          {(viewCase.prescriptions || []).map((p, i) => (
            <div key={i}>
              <p><strong>Date:</strong> {new Date(p.date).toLocaleDateString()}</p>
              <p><strong>Remedy:</strong> {p.remedyName}</p>
              <p><strong>Potency:</strong> {p.potency}</p>
              <p><strong>Dose:</strong> {p.dose}</p>
              <p><strong>Instructions:</strong> {p.instructions}</p>
            </div>
          ))}

          <h4>Personal History</h4>
          {viewCase.personalHistory &&
            Object.entries(viewCase.personalHistory).map(([key, val]) => (
              <p key={key}><strong>{key}:</strong> {val}</p>
            ))}

          {viewCase.imageUrl && (
            <div>
              <h4>Uploaded Image:</h4>
              <img src={viewCase.imageUrl} alt="Uploaded" width="150" />
            </div>
          )}

          <div style={{ marginTop: '10px' }}>
            <button onClick={() => setIsViewModalOpen(false)}>Close</button>
          </div>
        </Modal>
      )}
    </div>
  );
};

export default CasesList;
