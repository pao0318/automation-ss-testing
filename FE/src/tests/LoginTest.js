import React, { useState } from 'react';
import axios from 'axios';
const compareScreenshots = async (base64Image1, base64Image2) => {
    try {
        const response = await axios.post('http://localhost:8080/api/compare-screenshots', {
            base64Image1,
            base64Image2,
        });
        // Handle the comparison result (e.g., display the diff percentage)
    } catch (error) {
        console.error('Error comparing screenshots:', error);
    }
};

const TestElements = () => {
  const [base64Image1, setBase64Image1] = useState(null);
  const [base64Image2, setBase64Image2] = useState(null);

  const handleCaptureAndCompare = async () => {
    try {
      // Capture the first screenshot
      const response1 = await axios.get('http://localhost:8080/api/capture-screenshot');
      setBase64Image1(response1.data);

      // Capture the second screenshot
      setBase64Image2(response1.data);

      // Compare the two screenshots
      compareScreenshots(base64Image1, base64Image2);
    } catch (error) {
      console.error('Error capturing or comparing screenshots:', error);
    }
  };

  return (
    <div>
      {/* Your component UI */}
      <button onClick={handleCaptureAndCompare}>Capture and Compare</button>
    </div>
  );
};

export default TestElements;
