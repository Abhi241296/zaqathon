// src/components/FileUploader.js
import React from 'react';

export default function FileUploader({ onDataLoaded }) {
  const handleFile = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    // Only accept text files
    if (!file.type.startsWith('text')) {
      alert('Please upload a text file (.txt).');
      return;
    }
    const reader = new FileReader();
    reader.onload = () => {
      const content = reader.result;
      onDataLoaded(content);  // pass file text to parent
    };
    reader.onerror = () => {
      alert('Error reading file.');
    };
    reader.readAsText(file);
  };

  return (
    <div className="form-control w-full max-w-lg my-4">
      <label className="label">
        <span className="label-text">Upload Email (.txt format)</span>
      </label>
      <input type="file" accept=".txt" onChange={handleFile} className="file-input file-input-bordered w-full" />
    </div>
  );
}