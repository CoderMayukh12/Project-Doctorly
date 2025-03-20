import React, { useState } from "react";

const FileUpload = ({ onUploadComplete }) => {
  const [selectedFiles, setSelectedFiles] = useState([]);

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    if (files.length > 5) {
      alert("You can upload a maximum of 5 reports.");
      return;
    }
    setSelectedFiles(files);
  };

  const handleUpload = (e) => {
    e.preventDefault();
    // Here you would typically send the files to your backend
    console.log("Uploading files:", selectedFiles);
    if (onUploadComplete) {
      onUploadComplete(selectedFiles);
    }
  };

  return (
    <div className="file-upload">
      <h3>Upload Blood Reports</h3>
      <form onSubmit={handleUpload}>
        <input type="file" accept=".pdf" multiple onChange={handleFileChange} />
        <button type="submit">Upload</button>
      </form>
    </div>
  );
};

export default FileUpload;
