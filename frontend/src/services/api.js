// src/services/api.js

import axios from 'axios';

// Use environment variable for BASE_URL or fallback to the default
const BASE_URL = process.env.REACT_APP_API_BASE_URL || 'https://swiftphotoai.com/flask/face_swap';
const FRONTEND_URL = process.env.FRONTEND_URL || 'https://swiftphotoai.com';

/**
 * Uploads an image to the backend.
 * @param {File} imageFile - The image file to upload.
 * @returns {string|null} - The URL of the uploaded image or null if failed.
 */
export const uploadImage = async (imageFile) => {
  const formData = new FormData();
  formData.append('image', imageFile);

  try {
    const response = await axios.post(`${BASE_URL}/upload`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data.imageUrl; // Return the URL of the uploaded image
  } catch (error) {
    console.error('Error uploading image:', error.response ? error.response.data : error.message);
    throw new Error('Image upload failed. Please try again.');
  }
};

/**
 * Swaps faces between source and target images.
 * @param {string} sourceUrl - The URL of the source image.
 * @param {string} targetUrl - The URL of the target image.
 * @returns {string|null} - The URL of the face-swapped result or null if failed.
 */
export const swapFaces = async (sourceUrl, targetUrl) => {
  try {
    // Check if the target URL starts with either http or https
    const isFullUrl = /^https?:\/\//.test(targetUrl);

    // If it's not a full URL, prepend the FRONTEND_URL
    const finalTargetUrl = isFullUrl ? targetUrl : FRONTEND_URL + targetUrl;

    const response = await axios.get(`${BASE_URL}/swap_faces`, {
      params: {
        source: sourceUrl,
        target: finalTargetUrl,
      },
    });

    return response.data.result_url; // Return the URL of the face-swapped result
  } catch (error) {
    console.error('Error swapping faces:', error.response ? error.response.data : error.message);
    throw new Error(error.response?.data?.error || 'Face swap failed. Please try again.');
  }
};
