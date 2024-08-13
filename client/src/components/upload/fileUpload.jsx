import React, { useRef } from 'react';


function FileUpload() {
 // Create a ref to access the hidden file input element
 const fileInputRef = useRef(null);


 const handleFileUpload = (event) => {
   const file = event.target.files[0];


   if (file) {
     const formData = new FormData();
     formData.append('pdf', file);


     //we need to change this
     fetch('/upload-endpoint', {
       method: 'POST',
       body: formData,
     })
       .then((response) => response.json())
       .then((data) => {
         console.log('File uploaded successfully:', data);
       })
       .catch((error) => {
         console.error('Error uploading file:', error);
       });
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