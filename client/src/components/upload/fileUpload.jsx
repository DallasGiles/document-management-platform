import React, { useRef } from 'react';
import { useMutation } from '@apollo/client';
import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';
import { SITEPLAN_UPLOAD } from '../../apollo/queries';

function FileUpload() {
  // Create a ref to access the hidden file input element
  const fileInputRef = useRef(null);
  const [ uploadFile ] = useMutation(SITEPLAN_UPLOAD);

  const handleClick = () => {
    // Trigger the click event on the hidden file input
    fileInputRef.current.click();
  };

  const handleFileUpload = async ({ target: { validity, files: [file] } }) => {
    if (validity.valid) {
      const token = localStorage.getItem('token');
      const result = await uploadFile({
        variables: {
          file
        },
        context: { headers: { authorization: `Bearer ${token}` } }
      });

      console.log('result', result);
    }
  }

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
        className="bg-blue-500 text-white font-medium py-1 px-4 border border-gray-400 rounded-lg tracking-wide m-4 hover:bg-green-400"
        onClick={handleClick}
      >
        +PDF
      </button>
    </div>
  );
}

export default FileUpload;