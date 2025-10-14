import React, { useState } from 'react';
import { FaCloudUploadAlt, FaFileAlt, FaCheckCircle, FaExclamationTriangle } from 'react-icons/fa';

const UploadForm = ({ onUploadSuccess }) => {
  const [file, setFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState('');
  const [dragActive, setDragActive] = useState(false);

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile && selectedFile.type === 'text/xml') {
      setFile(selectedFile);
      setError('');
    } else {
      setError('Please select a valid XML file');
      setFile(null);
    }
  };

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    const files = e.dataTransfer.files;
    if (files && files[0]) {
      const droppedFile = files[0];
      if (droppedFile.type === 'text/xml' || droppedFile.name.endsWith('.xml')) {
        setFile(droppedFile);
        setError('');
      } else {
        setError('Please drop a valid XML file');
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!file) {
      setError('Please select a file');
      return;
    }

    setUploading(true);
    const formData = new FormData();
    formData.append('xmlFile', file);

    try {
      const response = await fetch('http://localhost:5000/api/upload', {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        const data = await response.json();
        onUploadSuccess(data.id);
        setFile(null);
        e.target.reset();
      } else {
        const errorData = await response.json();
        setError(errorData.error || 'Upload failed');
      }
    } catch (err) {
      setError('Network error');
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto bg-gradient-to-br from-white to-blue-50 p-8 rounded-2xl shadow-xl border border-gray-200">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-gray-800 mb-2 flex items-center justify-center gap-3">
          <FaCloudUploadAlt className="text-blue-600" />
          Upload Credit Report
        </h2>
        <p className="text-gray-600">Upload your Experian XML credit report for analysis</p>
      </div>

      <form onSubmit={handleSubmit}>
        {/* Drag and Drop Area */}
        <div
          className={`relative border-2 border-dashed rounded-xl p-8 mb-6 transition-all duration-300 ${
            dragActive
              ? 'border-blue-500 bg-blue-50 scale-105'
              : file
              ? 'border-green-400 bg-green-50'
              : 'border-gray-300 hover:border-blue-400 hover:bg-blue-50'
          }`}
          onDragEnter={handleDrag}
          onDragLeave={handleDrag}
          onDragOver={handleDrag}
          onDrop={handleDrop}
        >
          <input
            type="file"
            accept=".xml"
            onChange={handleFileChange}
            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
            id="file-upload"
          />

          <div className="text-center">
            {file ? (
              <div className="flex flex-col items-center">
                <FaFileAlt className="text-green-500 text-4xl mb-4" />
                <p className="text-lg font-semibold text-gray-800 mb-2">{file.name}</p>
                <p className="text-sm text-gray-600">
                  {(file.size / 1024).toFixed(2)} KB • Ready to upload
                </p>
              </div>
            ) : (
              <div className="flex flex-col items-center">
                <FaCloudUploadAlt className="text-blue-500 text-5xl mb-4" />
                <p className="text-lg font-semibold text-gray-800 mb-2">
                  Drag & drop your XML file here
                </p>
                <p className="text-gray-600 mb-4">or click to browse</p>
                <div className="bg-blue-100 text-blue-800 px-4 py-2 rounded-full text-sm font-medium">
                  Supports .xml files only
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Error Message */}
        {error && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6 flex items-center gap-3">
            <FaExclamationTriangle className="text-red-500 flex-shrink-0" />
            <p className="text-red-700">{error}</p>
          </div>
        )}

        {/* Upload Button */}
        <button
          type="submit"
          disabled={uploading || !file}
          className={`w-full py-4 px-6 rounded-xl font-semibold text-lg transition-all duration-300 flex items-center justify-center gap-3 ${
            uploading
              ? 'bg-gray-400 cursor-not-allowed'
              : file
              ? 'bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white shadow-lg hover:shadow-xl transform hover:-translate-y-0.5'
              : 'bg-gray-300 cursor-not-allowed text-gray-500'
          }`}
        >
          {uploading ? (
            <>
              <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
              Processing Report...
            </>
          ) : file ? (
            <>
              <FaCheckCircle />
              Upload & Analyze Report
            </>
          ) : (
            'Select File to Upload'
          )}
        </button>
      </form>

      {/* Instructions */}
      <div className="mt-8 bg-blue-50 rounded-lg p-6 border border-blue-200">
        <h3 className="text-lg font-semibold text-blue-800 mb-3">Upload Instructions:</h3>
        <ul className="text-blue-700 space-y-2 text-sm">
          <li>• Ensure your XML file is from Experian credit report</li>
          <li>• File size should be less than 10MB</li>
          <li>• Only .xml format is supported</li>
          <li>• Processing may take a few seconds</li>
        </ul>
      </div>
    </div>
  );
};

export default UploadForm;
