import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import targetImages from '../../utils/targetImages'; // Import your images
import './Gallery.css'; // Import the corresponding CSS

function Gallery() {
  const { category } = useParams(); // Get the category from the URL
  const navigate = useNavigate();
  const images = targetImages[category] || [];

  const handleImageClick = (imageIndex) => {
    // You can pass the image index or any identifier if needed
    navigate(`/form/${category}`, { state: { imageIndex } });
  };

  return (
    <div className="gallery-container">
      <h1 className="gallery-title">{capitalize(category)} Gallery</h1>
      <div className="gallery-grid">
        {images.map((image, index) => (
          <div
            key={index}
            className="gallery-image-card"
            onClick={() => handleImageClick(index)}
          >
            <img src={image} alt={`${category} ${index + 1}`} className="gallery-image" />
          </div>
        ))}
      </div>
    </div>
  );
}

// Helper function to capitalize the first letter
const capitalize = (str) => str.charAt(0).toUpperCase() + str.slice(1);

export default Gallery;
