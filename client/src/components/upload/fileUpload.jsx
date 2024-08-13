import React, { useRef } from 'react';
import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';

function FileUpload() {
  // Create a ref to access the hidden file input element
  const fileInputRef = useRef(null);

  // AWS S3 Client Setup
  const s3Client = new S3Client({
    region: process.env.REACT_APP_AWS_REGION, 
    credentials: {
      accessKeyId: process.env.REACT_APP_AWS_ACCESS_KEY,
      secretAccessKey: process.env.REACT_APP_AWS_SECRET_ACCESS_KEY,
    },
  });

  // Random File Name Generator
  const randomFileName = (bytes = 32) => {
    const array = new Uint8Array(bytes);
    window.crypto.getRandomValues(array);
    return Array.from(array, byte => byte.toString(16).padStart(2, '0')).join('');
  };

  const handleFileUpload = async (event) => {
    const file = event.target.files[0];

    if (file) {
      const uniqueName = randomFileName();
      const uploadParams = {
        Bucket: process.env.REACT_APP_AWS_BUCKET_NAME,
        Key: uniqueName,
        Body: file,
        ContentType: file.type,
      };

      try {
        const result = await s3Client.send(new PutObjectCommand(uploadParams));
        console.log('File uploaded successfully:', result);
      } catch (error) {
        console.error('Error uploading file:', error);
      }
    }
  };

  const handleClick = () => {
    // Trigger the click event on the hidden file input
    fileInputRef.current.click();
  };

  return (
    <div>
      <input
        id="pdf-upload"
        type="file"
        accept=".pdf"
        ref={fileInputRef}
        className="hidden"
        onChange={handleFileUpload}
      />
      <button
        type="button"
        className="bg-white text-gray-700 font-medium py-1 px-4 border border-gray-400 rounded-lg tracking-wide m-4 hover:bg-gray-100"
        onClick={handleClick}
      >
        +PDF
      </button>
    </div>
  );
}

export default FileUpload;