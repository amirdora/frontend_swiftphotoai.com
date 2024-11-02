// src/components/ObjectRemoval.jsx
import React, { useState, useRef, useEffect } from 'react';
import { Stage, Layer, Image as KonvaImage, Line } from 'react-konva';
import useImage from 'use-image';
import axios from 'axios';
import './ObjectRemoval.css';

const ObjectRemoval = () => {
  const [image, setImage] = useState(null); // Original image file
  const [imageURL, setImageURL] = useState(null); // URL for the original image
  const [lines, setLines] = useState([]); // Drawn mask lines
  const isDrawing = useRef(false);
  const stageRef = useRef(null);
  const [brushColor, setBrushColor] = useState('#FF0000');
  const [brushSize, setBrushSize] = useState(10);
  const [stageSize, setStageSize] = useState({
    width: window.innerWidth * 0.9,
    height: window.innerHeight * 0.6,
  });
  const [scale, setScale] = useState(1);
  const [loadedImage, status] = useImage(imageURL, 'anonymous');
  const [resultImage, setResultImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [originalDimensions, setOriginalDimensions] = useState({ width: 0, height: 0 }); // New state

  // Handle window resize for responsiveness
  useEffect(() => {
    const handleResize = () => {
      if (loadedImage) {
        const { width: imgWidth, height: imgHeight } = loadedImage;
        const { innerWidth: windowWidth, innerHeight: windowHeight } = window;

        // Calculate scale to fit image within window while maintaining aspect ratio
        const scaleWidth = (windowWidth * 0.9) / imgWidth;
        const scaleHeight = (windowHeight * 0.6) / imgHeight;
        const newScale = Math.min(scaleWidth, scaleHeight, 1); // Prevent upscaling

        setScale(newScale);
        setStageSize({
          width: imgWidth * newScale,
          height: imgHeight * newScale,
        });

        // Store original dimensions
        setOriginalDimensions({
          width: imgWidth,
          height: imgHeight,
        });
      } else {
        setStageSize({
          width: window.innerWidth * 0.9,
          height: window.innerHeight * 0.6,
        });
      }
    };

    // Initial resize
    handleResize();

    // Add event listener
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [loadedImage]);

  // Handle image upload
  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setError(null);
      setResultImage(null);
      const reader = new FileReader();
      reader.onload = () => {
        setImage(file);
        setImageURL(reader.result);
        setLines([]); // Clear previous drawings
      };
      reader.readAsDataURL(file);
    }
  };

  // Start drawing
  const handleMouseDown = (e) => {
    if (status !== 'loaded') return; // Prevent drawing before image loads
    isDrawing.current = true;
    const pos = e.target.getStage().getPointerPosition();
    setLines([...lines, { points: [pos.x, pos.y], stroke: brushColor, strokeWidth: brushSize }]);
  };

  // Drawing in progress
  const handleMouseMove = (e) => {
    if (!isDrawing.current) return;
    const stage = e.target.getStage();
    const point = stage.getPointerPosition();
    let lastLine = lines[lines.length - 1];
    // Add point
    lastLine.points = lastLine.points.concat([point.x, point.y]);
    // Replace the last line
    lines.splice(lines.length - 1, 1, lastLine);
    setLines(lines.concat());
  };

  // Stop drawing
  const handleMouseUp = () => {
    isDrawing.current = false;
  };

  // Clear all drawings
  const handleClear = () => {
    setLines([]);
    setError(null);
    setResultImage(null);
  };

  // Undo the last drawing
  const handleUndo = () => {
    if (lines.length === 0) return;
    const newLines = lines.slice(0, -1);
    setLines(newLines);
  };

  // Convert mask to black and white at original dimensions
  const convertMaskToBW = () => {
    // Create an off-screen canvas with original image dimensions
    const maskCanvas = document.createElement('canvas');
    maskCanvas.width = originalDimensions.width;
    maskCanvas.height = originalDimensions.height;
    const maskCtx = maskCanvas.getContext('2d');

    // Fill the canvas with black (background)
    maskCtx.fillStyle = 'black';
    maskCtx.fillRect(0, 0, maskCanvas.width, maskCanvas.height);

    // Set up for drawing the mask
    maskCtx.strokeStyle = 'white';
    maskCtx.lineWidth = brushSize; // Use the current brush size
    maskCtx.lineCap = 'round';
    maskCtx.lineJoin = 'round';

    // Calculate scaling factors
    const scaleX = originalDimensions.width / stageSize.width;
    const scaleY = originalDimensions.height / stageSize.height;

    // Draw each line scaled to original dimensions
    lines.forEach((line) => {
      if (line.points.length > 1) {
        maskCtx.beginPath();
        // Scale points
        const scaledPoints = line.points.map((point, index) => {
          return index % 2 === 0 ? point * scaleX : point * scaleY;
        });
        maskCtx.moveTo(scaledPoints[0], scaledPoints[1]);
        for (let i = 2; i < scaledPoints.length; i += 2) {
          maskCtx.lineTo(scaledPoints[i], scaledPoints[i + 1]);
        }
        maskCtx.stroke();
      }
    });

    // Convert the mask to a data URL
    return maskCanvas.toDataURL('image/png');
  };

  // Handle export and upload
  const handleExportAndUpload = async () => {
    if (!image) {
      setError('Please upload and annotate an image first.');
      return;
    }

    if (lines.length === 0) {
      setError('Please draw a mask on the image before submitting.');
      return;
    }

    setLoading(true);
    setError(null);
    setResultImage(null);

    try {
      // Convert mask to black and white at original dimensions
      const bwMask = convertMaskToBW();

      // Convert data URL to Blob
      const maskBlob = await (await fetch(bwMask)).blob();

      // Prepare FormData
      const formData = new FormData();
      formData.append('image', image);
      formData.append('mask', maskBlob, 'mask.png');

      // API endpoint (replace with your actual endpoint)
      const API_ENDPOINT = 'https://swiftphotoai.com/flask/object_removal/remove_object';

      // Send POST request using axios
      const response = await axios.post(API_ENDPOINT, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        responseType: 'blob', // Expecting a binary response
      });

      // Create a URL for the result image
      const imageUrl = URL.createObjectURL(new Blob([response.data], { type: 'image/png' }));
      setResultImage(imageUrl);
      setError(null);
    } catch (err) {
      console.error('Error uploading:', err);
      setError('An error occurred while processing your request.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="object-removal-container">
      <h2>Object Removal Tool</h2>

      {/* Upload Section */}
      <div className="upload-section">
        <label className="upload-label">
          <span>Upload Image</span>
          <input type="file" accept="image/*" onChange={handleImageUpload} />
        </label>
      </div>

      {/* Brush Settings */}
      {imageURL && (
        <div className="brush-settings">
          <div className="brush-size">
            <label>
              Size:
              <input
                type="range"
                min="5"
                max="50"
                value={brushSize}
                onChange={(e) => setBrushSize(parseInt(e.target.value, 10))}
              />
              <span>{brushSize}px</span>
            </label>
          </div>
          <div className="brush-actions">
            <button onClick={handleUndo} disabled={lines.length === 0}>
              Undo
            </button>
            <button onClick={handleClear}>Clear</button>
          </div>
        </div>
      )}

      {/* Canvas */}
      {imageURL && (
        <div className="canvas-wrapper">
          <Stage
            width={stageSize.width}
            height={stageSize.height}
            onMouseDown={handleMouseDown}
            onMousemove={handleMouseMove}
            onMouseup={handleMouseUp}
            onTouchStart={handleMouseDown}
            onTouchMove={handleMouseMove}
            onTouchEnd={handleMouseUp}
            ref={stageRef}
            className="canvas-stage"
          >
            <Layer>
              {loadedImage && (
                <KonvaImage
                  image={loadedImage}
                  width={loadedImage.width * scale}
                  height={loadedImage.height * scale}
                />
              )}
            </Layer>
            <Layer>
              {lines.map((line, i) => (
                <Line
                  key={i}
                  points={line.points}
                  stroke={line.stroke}
                  strokeWidth={line.strokeWidth}
                  tension={0.5}
                  lineCap="round"
                  globalCompositeOperation={'source-over'}
                />
              ))}
            </Layer>
          </Stage>
        </div>
      )}

      {/* Action Buttons */}
      {imageURL && (
        <div className="action-buttons">
          <button onClick={handleExportAndUpload} disabled={loading}>
            {loading ? (
              <>
                <span className="spinner"></span> Processing...
              </>
            ) : (
              'Remove Object'
            )}
          </button>
        </div>
      )}

      {/* Feedback Messages */}
      {error && <div className="message error-message">{error}</div>}
      {resultImage && (
        <div className="result-section">
          <h4>Result:</h4>
          <img src={resultImage} alt="Result" className="result-image" />
          <a href={resultImage} download="result-image.png">
            <button className="download-button">Download Image</button>
          </a>
        </div>
      )}
    </div>
  );
};

export default ObjectRemoval;
