import React, { useEffect, useState } from 'react';

const TabIcon = () => {
  const [imageSrc, setImageSrc] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        console.log('Fetching image...');
        const response = await fetch('http://127.0.0.1:8080/pyrrhus2/Red_Panda_Icon.png');
      
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        
        const arrayBuffer = await response.arrayBuffer();
        console.log('ArrayBuffer received:', arrayBuffer);

        // Convert ArrayBuffer to Blob
        const blob = new Blob([new Uint8Array(arrayBuffer)], { type: 'image/png' });
        // Create URL for the Blob
        const imageUrl = URL.createObjectURL(blob);
        console.log('Image URL:', imageUrl);

        setImageSrc(imageUrl);

        // Cleanup the object URL after the image loads
        return () => URL.revokeObjectURL(imageUrl);
      } catch (error) {
        console.error('Error fetching or processing image:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <head>
      {imageSrc ? (
        <link src={imageSrc} rel="icon" />
      ) : (
        <p>Loading image...</p>
      )}
    </head>
  );
};

export default TabIcon;

