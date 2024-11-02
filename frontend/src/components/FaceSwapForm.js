import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import ImageUploader from './ImageUploader';
import ImageSelector from './ImageSelector';
import targetImages from '../utils/targetImages'; // Ensure this path is correct
import { uploadImage, swapFaces } from '../services/api'; // Import the functions directly

const FaceSwapForm = () => {
  const { categorySlug } = useParams(); // Get the category slug from URL
  const navigate = useNavigate(); // For navigation to ResultPage

  const [selectedFile, setSelectedFile] = useState(null); // Binary file to upload (user's image)
  const [selectedImage, setSelectedImage] = useState(null); // URL of the selected target image
  const [uploadedTargetFile, setUploadedTargetFile] = useState(null); // File for target image upload if no categorySlug
  const [status, setStatus] = useState(''); // Status messages
  const [error, setError] = useState(''); // Error messages

  // Retrieve target images based on the selected category, if available
  const targetImagesForCategory = targetImages[categorySlug] || [];

  // Function to handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setStatus('');

    // Ensure both images are selected (or uploaded) before submission
    if (!selectedFile || (!selectedImage && !uploadedTargetFile)) {
      setError('Please upload your image and a target image.');
      return;
    }

    try {
      setStatus('Uploading your image...');
      const sourceUrl = await uploadImage(selectedFile); // Upload the user's face image and get the URL

      let targetUrl;
      if (categorySlug) {
        targetUrl = selectedImage; // If a category is selected, use the predefined target image
      } else {
        setStatus('Uploading target image...');
        targetUrl = await uploadImage(uploadedTargetFile); // If no category, upload the target image
      }

      setStatus('Swapping faces...');
      const resultUrl = await swapFaces(sourceUrl, targetUrl); // Perform the face swap

      if (resultUrl) {
        setStatus('Face swap successful! Redirecting to result...');
        // Navigate to ResultPage with the resultUrl
        navigate('/result', { state: { resultUrl } });
      } else {
        setError('Face swap failed. Please try again.');
        setStatus('');
      }
    } catch (err) {
      setError(err.message || 'An unexpected error occurred. Please try again.');
      setStatus('');
    }
  };

  return (
    <div className="face-swap-form">
      <h2>Face Swap {categorySlug ? `- ${categorySlug.charAt(0).toUpperCase() + categorySlug.slice(1)}` : ''}</h2>
      <form onSubmit={handleSubmit}>
        {/* Source image uploader */}
        <ImageUploader
          selectedFile={selectedFile}
          setSelectedFile={setSelectedFile}
          label="Upload your face"
        />

        {/* Conditionally show image selector or target image uploader */}
        {categorySlug ? (
          // If a category is selected, show the image selector for predefined images
          <ImageSelector
            targetImages={targetImagesForCategory}
            selectedImage={selectedImage}
            setSelectedImage={setSelectedImage}
            label="Select a target image"
          />
        ) : (
          // If no category, allow the user to upload a target image
          <ImageUploader
            selectedFile={uploadedTargetFile}
            setSelectedFile={setUploadedTargetFile}
            label="Upload a target image"
          />
        )}

        {categorySlug && (
          <a href="/form" className="upload-link text-center text-muted text-decoration-none small">
            Or Upload Custom Target Image
          </a>
        )}

        {/* Submit button */}
        <button
          type="submit"
          className="submit-button"
          disabled={status === 'Uploading your image...' || status === 'Swapping faces...'}
        >
          Swap Faces
        </button>

        {/* Status and error messages */}
        {status && <p className="status">{status}</p>}
        {error && <p className="error">{error}</p>}
      </form>

      {/* Existing styles */}
      <style jsx>{`
        .face-swap-form {
          max-width: 600px;
          margin: 40px auto;
          padding: 30px;
          border: 1px solid #eaeaea;
          border-radius: 10px;
          background-color: #fff;
          box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
        }
        h2 {
          text-align: center;
          margin-bottom: 25px;
          font-size: 28px;
          color: #333;
        }
        form {
          display: flex;
          flex-direction: column;
          gap: 25px;
        }
        .submit-button {
          padding: 12px 0;
          background-color: #28a745;
          color: #fff;
          border: none;
          border-radius: 8px;
          font-size: 18px;
          cursor: pointer;
          transition: background-color 0.3s;
        }
        .submit-button:hover {
          background-color: #218838;
        }
        .submit-button:disabled {
          background-color: #94d3a2;
          cursor: not-allowed;
        }
        .status {
          margin-top: 20px;
          font-size: 18px;
          color: #555;
          text-align: center;
        }
        .error {
          margin-top: 20px;
          font-size: 18px;
          color: red;
          text-align: center;
        }
        @media (max-width: 768px) {
          .face-swap-form {
            padding: 20px;
          }
          h2 {
            font-size: 24px;
          }
          .submit-button {
            font-size: 16px;
          }
        }
      `}</style>
    </div>
  );
};

export default FaceSwapForm;
