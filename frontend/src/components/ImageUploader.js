// src/ImageUploader.js

import React, { useCallback, useEffect, useState } from 'react';
import { useDropzone } from 'react-dropzone';

const ImageUploader = ({ selectedFile, setSelectedFile }) => {
  const [previewUrl, setPreviewUrl] = useState(null); // State to hold the preview URL

  const onDrop = useCallback(
    (acceptedFiles) => {
      const file = acceptedFiles[0];
      const maxSize = 5 * 1024 * 1024; // 5MB
      
      if (file.size > maxSize) {
        alert('File size exceeds 5MB. Please select a smaller file.');
        return;
      }
      
      setSelectedFile(file); // Store the selected file in state
    },
    [setSelectedFile]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: 'image/*',
    multiple: false,
  });

  useEffect(() => {
    if (!selectedFile) {
      setPreviewUrl(null);
      return;
    }

    // Create a preview URL for the selected file
    const objectUrl = URL.createObjectURL(selectedFile);
    setPreviewUrl(objectUrl);

    // Clean up the URL object when the component unmounts or when a new file is selected
    return () => URL.revokeObjectURL(objectUrl);
  }, [selectedFile]);

  return (
    <div className="uploader">
      <h3>Upload Your Image:</h3>
      <div {...getRootProps()} className={`dropzone ${isDragActive ? 'active' : ''}`}>
        <input {...getInputProps()} />
        {selectedFile ? (
          <div className="preview-container">
            {previewUrl ? (
              <img src={previewUrl} alt="Uploaded preview" className="preview-image" />
            ) : (
              <p>{selectedFile.name}</p>
            )}
          </div>
        ) : (
          <p>Drag & drop your image here, or click to select.</p>
        )}
      </div>

      {selectedFile && (
        <button type="button" onClick={() => setSelectedFile(null)} className="remove-button">
          Remove Image
        </button>
      )}

      {/* Styles */}
      <style jsx>{`
        .uploader {
          display: flex;
          flex-direction: column;
          align-items: center;
          margin-bottom: 20px;
        }
        h3 {
          margin-bottom: 10px;
          color: #333;
        }
        .dropzone {
          width: 100%;
          max-width: 400px;
          height: 200px;
          border: 2px dashed #cccccc;
          border-radius: 10px;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: border-color 0.3s, background-color 0.3s;
          background-color: #fafafa;
        }
        .dropzone.active {
          border-color: #28a745;
          background-color: #f0fff0;
        }
        .preview-container {
          display: flex;
          align-items: center;
          justify-content: center;
          height: 100%;
          width: 100%;
        }
        .preview-image {
          max-width: 100%;
          max-height: 100%;
          object-fit: contain;
          border-radius: 8px;
        }
        p {
          color: #666666;
        }
        .remove-button {
          margin-top: 10px;
          padding: 8px 16px;
          background-color: #dc3545;
          color: #fff;
          border: none;
          border-radius: 5px;
          cursor: pointer;
          transition: background-color 0.3s;
        }
        .remove-button:hover {
          background-color: #c82333;
        }
        @media (max-width: 768px) {
          .dropzone {
            height: 150px;
          }
        }
      `}</style>
    </div>
  );
};

export default ImageUploader;
