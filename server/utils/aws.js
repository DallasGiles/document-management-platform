const AWS = require('aws-sdk');

// We need keys here
const s3 = new AWS.S3({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: process.env.AWS_REGION,
});

// uploads a file to S3
const uploadFile = async (file) => {
  const params = {
    Bucket: process.env.AWS_BUCKET_NAME, // your bucket name
    Key: file.filename, // file will be saved as your-bucket-name/filename
    Body: file.content, // file content
  };

  try {
    const data = await s3.upload(params).promise();
    return data;
  } catch (error) {
    throw new Error('Error uploading file: ' + error.message);
  }
};

// get a file from S3
const getFile = async (key) => {
  const params = {
    Bucket: process.env.AWS_BUCKET_NAME,
    Key: key,
  };

  try {
    const data = await s3.getObject(params).promise();
    return data.Body;
  } catch (error) {
    throw new Error('Error fetching file: ' + error.message);
  }
};

module.exports = {
  uploadFile,
  getFile,
};