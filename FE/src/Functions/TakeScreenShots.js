import React, { useEffect } from 'react';
import html2canvas from 'html2canvas';

const TakeScreenShots = ({shouldCapture}) => {
  useEffect(() => {
    const captureScreenshot = async () => {
      try {
        // Capture the screenshot of the entire document body
        const canvas = await html2canvas(document.body);
        const dataUrl = canvas.toDataURL('image/png');

        await saveScreenShotOnServer(dataUrl);
        console.log('Took screenshot successfully:', dataUrl);
      } catch (error) {
        console.error('Error capturing screenshot:', error);
      }
    };

    const saveScreenShotOnServer = async (dataUrl) => {
      try {
        const response = await fetch('http://localhost:8080/api/save-screenshot', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ dataUrl }),
        });

        if (response.ok) {
          console.log('Screenshot saved successfully');
        } else {
          console.error('Failed to save to the server');
        }
      } catch (error) {
        console.error('Error saving screenshot on server:', error);
      }
    };

    if(shouldCapture){
    captureScreenshot();
    }
  }, [shouldCapture]);

  return null;
};

export default TakeScreenShots;
