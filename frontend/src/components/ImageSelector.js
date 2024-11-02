// src/ImageSelector.js

import React from 'react';

const ImageSelector = ({ targetImages, selectedImage, setSelectedImage }) => {
  return (
    <div className="image-selector">
      <h3>Select a Target Image:</h3>
      <div className="images-grid">
        {targetImages.map((imgSrc, index) => (
          <img
            key={index}
            src={imgSrc}
            alt={`Target ${index + 1}`}
            className={`target-image ${selectedImage === imgSrc ? 'selected' : ''}`}
            onClick={() => setSelectedImage(imgSrc)}
          />
        ))}
      </div>

      {/* Styles */}
      <style jsx>{`
        .image-selector {
          text-align: center;
        }
        .images-grid {
          display: flex;
          justify-content: center;
          gap: 15px;
          flex-wrap: wrap;
          margin-top: 10px;
        }
        .target-image {
          width: 100px;
          height: 100px;
          object-fit: cover;
          border: 3px solid transparent;
          border-radius: 8px;
          cursor: pointer;
          transition: border 0.3s, transform 0.3s;
        }
        .target-image:hover {
          transform: scale(1.05);
        }
        .target-image.selected {
          border-color: #007bff;
        }
      `}</style>
    </div>
  );
};

export default ImageSelector;
