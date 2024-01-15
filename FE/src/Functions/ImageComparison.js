import React, { useState } from 'react';

const ImageComparison = () => {
  const [img1, setImg1] = useState('');
  const [img2, setImg2] = useState('');
  const [similarityScore, setSimilarityScore] = useState(null);

  const handleImageUpload = async (e, setImage) => {
    const file = e.target.files[0];
    const reader = new FileReader();

    reader.onloadend = () => {
      const imageData = reader.result;
      setImage(imageData);
    };

    if (file) {
      reader.readAsDataURL(file);
    }
  };

  const compareImages = async () => {
    try {
      const response = await fetch('http://localhost:8080/api/compare-images', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ img1, img2 }),
      });

      if (response.ok) {
        const result = await response.json();
        setSimilarityScore(result.similarity);
      } else {
        console.error('Failed to compare images:', response.statusText);
      }
    } catch (error) {
      console.error('Error comparing images:', error.message);
    }
  };

  return (
    <div>
      <input type="file" onChange={(e) => handleImageUpload(e, setImg1)} />
      <input type="file" onChange={(e) => handleImageUpload(e, setImg2)} />
      <button onClick={compareImages}>Compare Images</button>

      {similarityScore !== null && (
        <div>
          <p>Similarity Score: {similarityScore.toFixed(2)}%</p>
        </div>
      )}
    </div>
  );
};

export default ImageComparison;
