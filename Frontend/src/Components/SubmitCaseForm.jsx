import React, { useState } from 'react';
import axios from 'axios';

const SubmitCaseForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    age: '',
    gender: '',
    maritalStatus: '',
    occupation: '',
    address: '',
    phone: '',
    date: '',
    chiefComplaints: '',
    history: '',
    pastHistory: '',
    familyHistory: '',
    appetite: '',
    cravings: '',
    thirst: '',
    bowel: '',
    urine: '',
    sleep: '',
    dreams: '',
    sweat: '',
    thermal: '',
    habits: '',
    menstrual: '',
    mentalSymptoms: '',
    remarks: '',
    doctorObservations: '',
    prescription: '',
    faceImage: null,
  });

  const [capturedImage, setCapturedImage] = useState(null);
  const [cameraActive, setCameraActive] = useState(false);

  const handleChange = e => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleImageCapture = () => {
    const canvas = document.createElement('canvas');
    const video = document.querySelector('video');
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    const ctx = canvas.getContext('2d');
    ctx.drawImage(video, 0, 0);
    const dataUrl = canvas.toDataURL('image/png');
    setCapturedImage(dataUrl);
    setFormData(prev => ({ ...prev, faceImage: dataUrl }));
  };

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      await axios.post('https://your-backend-url/submit-case', formData);
      alert('Case submitted successfully!');
    } catch (err) {
      alert('Submission failed');
    }
  };

  const startCamera = () => {
    setCameraActive(true);
    navigator.mediaDevices
      .getUserMedia({ video: true })
      .then(stream => {
        const video = document.querySelector('video');
        video.srcObject = stream;
      })
      .catch(err => {
        alert('Camera access denied.');
      });
  };

  return (
    <div className="p-4 max-w-3xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">Submit Patient Case - Bhanu Homeopathy AI</h2>
      <form onSubmit={handleSubmit} className="space-y-4">

        {/* Simple text fields */}
        {[
          { label: 'Name', name: 'name' },
          { label: 'Age', name: 'age' },
          { label: 'Gender', name: 'gender' },
          { label: 'Marital Status', name: 'maritalStatus' },
          { label: 'Occupation', name: 'occupation' },
          { label: 'Address', name: 'address' },
          { label: 'Phone', name: 'phone' },
          { label: 'Date of Visit (dd/mm/yyyy)', name: 'date' },
        ].map(({ label, name }) => (
          <div key={name}>
            <label className="block font-medium">{label}</label>
            <input
              name={name}
              value={formData[name]}
              onChange={handleChange}
              className="border p-2 rounded w-full"
              required
            />
          </div>
        ))}

        {/* Longer textareas */}
        {[
          'chiefComplaints', 'history', 'pastHistory', 'familyHistory',
          'appetite', 'cravings', 'thirst', 'bowel', 'urine',
          'sleep', 'dreams', 'sweat', 'thermal', 'habits',
          'menstrual', 'mentalSymptoms', 'remarks',
          'doctorObservations', 'prescription',
        ].map(name => (
          <div key={name}>
            <label className="block font-medium capitalize">{name.replace(/([A-Z])/g, ' $1')}</label>
            <textarea
              name={name}
              value={formData[name]}
              onChange={handleChange}
              className="border p-2 rounded w-full"
              rows={2}
            />
          </div>
        ))}

        {/* Face upload */}
        <div>
          <label className="block font-medium">Capture Patient Face</label>
          {!capturedImage && !cameraActive && (
            <button
              type="button"
              className="bg-blue-500 text-white px-4 py-1 rounded"
              onClick={startCamera}
            >
              Start Camera
            </button>
          )}
          {cameraActive && (
            <>
              <video autoPlay playsInline className="my-2 border rounded" width="320" height="240" />
              <br />
              <button
                type="button"
                className="bg-green-600 text-white px-4 py-1 rounded"
                onClick={handleImageCapture}
              >
                Capture Image
              </button>
            </>
          )}
          {capturedImage && (
            <div className="mt-2">
              <img src={capturedImage} alt="Captured" className="w-48 h-48 border rounded" />
            </div>
          )}
        </div>

        <button
          type="submit"
          className="bg-green-600 text-white px-4 py-2 rounded"
        >
          Submit Case
        </button>
      </form>
    </div>
  );
};

export default SubmitCaseForm;
