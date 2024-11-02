// src/ResultPage.js

import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

function ResultPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const resultUrl = location.state?.resultUrl;

  const handleBack = () => {
    navigate('/');
  };

  return (
    <div className="result-page">
      <h1>Your Face Swapped Image</h1>
      {resultUrl ? (
        <>
          <img src={resultUrl} alt="Face Swapped Result" className="result-image" />
          <a href={resultUrl} download className="download-btn">
            Download Image
          </a>
          <button onClick={handleBack} className="back-button mt-2">
            Go Back
          </button>
        </>
      ) : (
        <p>No result available. Please try again.</p>
      )}

      {/* Styles */}
      <style jsx>{`
        .result-page {
          text-align: center;
          padding: 50px;
          background-color: #f9f9f9;
        }
        h1 {
          font-size: 32px;
          margin-bottom: 30px;
          color: #333;
        }
        .result-image {
          max-width: 80%;
          height: auto;
          border-radius: 10px;
          box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
          margin-bottom: 20px;
        }
        .download-btn {
          display: inline-block;
          padding: 10px 20px;
          margin-right: 10px;
          background-color: #007bff;
          color: #fff;
          text-decoration: none;
          border-radius: 5px;
          transition: background-color 0.3s;
        }
        .download-btn:hover {
          background-color: #0056b3;
        }
        .back-button {
          padding: 10px 20px;
          background-color: #6c757d;
          color: #fff;
          border: none;
          border-radius: 5px;
          cursor: pointer;
          transition: background-color 0.3s;
        }
        .back-button:hover {
          background-color: #5a6268;
        }
        @media (max-width: 768px) {
          .result-image {
            max-width: 100%;
          }
          h1 {
            font-size: 28px;
          }
        }
      `}</style>
    </div>
  );
}

export default ResultPage;
