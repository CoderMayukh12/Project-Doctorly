import React, { useState } from "react";
import { uploadReports } from "../services/api";

const UploadReports = () => {
  // State to store the selected files and any messages
  const [files, setFiles] = useState([]);
  const [message, setMessage] = useState("");

  // When files are selected, update the state
  const handleFileChange = (e) => {
    setFiles([...e.target.files]);
  };

  // When the user clicks the upload button, call the API
  const handleUpload = async () => {
    if (files.length === 0) {
      alert("Please select files to upload.");
      return;
    }

    const formData = new FormData();
    files.forEach((file) => {
      formData.append("reports", file);
    });

    // Assume you stored userId in localStorage after login
    const userId = localStorage.getItem("userId");
    if (userId) {
      formData.append("userId", userId);
    } else {
      // Alternatively, you can handle the case when there's no userId available
      alert("User not logged in.");
      return;
    }

    try {
      const data = await uploadReports(formData); // Update uploadReports accordingly
      setMessage(`Files uploaded: ${data.message}`);
    } catch (error) {
      console.error("Upload error:", error);
      setMessage("Failed to upload files.");
    }
  };

  return (
    <div className="p-8">
      <h1 className="text-2xl mb-4">Upload Blood Reports</h1>
      <input type="file" multiple onChange={handleFileChange} />
      <button
        onClick={handleUpload}
        className="bg-blue-500 text-white py-2 px-4 rounded-md mt-4 hover:bg-blue-600"
      >
        Upload
      </button>
      {message && <p className="mt-4">{message}</p>}
    </div>
  );
};

export default UploadReports;
