import React, { useState } from "react";
import axios from "axios";

const FaceUpload = () => {
  const [image, setImage] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [result, setResult] = useState(null);

  // Handle image selection and preview
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImage(file);
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setPreviewUrl(reader.result);
      reader.readAsDataURL(file);
    }
  };

  // Handle image upload
  const handleUpload = async () => {
    if (!image) {
      alert("Please select an image!");
      return;
    }

    const formData = new FormData();
    formData.append("image", image);

    try {
      const response = await axios.post(
        "https://bhanu-case-app.onrender.com/analyze-face",
        formData,
        { headers: { "Content-Type": "multipart/form-data" } }
      );

      setResult(response.data);
      console.log("AI Result:", response.data.aiResult);
    } catch (error) {
      console.error("Error uploading image:", error);
      alert("Error uploading image");
    }
  };

  return (
    <div style={{ padding: "20px", fontFamily: "Arial" }}>
      <h2>📸 Upload Face Image for Analysis</h2>

      <input type="file" accept="image/*" onChange={handleImageChange} />
      <br /><br />

      {previewUrl && (
        <div>
          <p>Preview:</p>
          <img
            src={previewUrl}
            alt="Preview"
            style={{ width: "200px", borderRadius: "10px", marginBottom: "10px" }}
          />
        </div>
      )}

      <button onClick={handleUpload} style={{ padding: "10px 20px", cursor: "pointer" }}>
        🔍 Analyze Image
      </button>

      {result && (
        <div style={{ marginTop: "20px", borderTop: "1px solid #ccc", paddingTop: "15px" }}>
          <h3>🧠 Analysis Result:</h3>
          <p><strong>Facial Type:</strong> {result.aiResult.facialType}</p>
          <p><strong>Constitution:</strong> {result.aiResult.constitution}</p>
          <p><strong>Suggested Remedies:</strong> {result.aiResult.remedies.join(", ")}</p>
        </div>
      )}
    </div>
  );
};

export default FaceUpload;
