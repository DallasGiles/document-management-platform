// const AWS = require('aws-sdk');

// // We need keys here
// const s3 = new AWS.S3({
//   accessKeyId: process.env.AWS_ACCESS_KEY_ID,
//   secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
//   region: process.env.AWS_REGION,
// });

// // uploads a file to S3
// const uploadFile = async (file) => {
//   const params = {
//     Bucket: process.env.AWS_BUCKET_NAME, // your bucket name
//     Key: file.filename, // file will be saved as your-bucket-name/filename
//     Body: file.content, // file content
//   };

//   try {
//     const data = await s3.upload(params).promise();
//     return data;
//   } catch (error) {
//     throw new Error('Error uploading file: ' + error.message);
//   }
// };

// // get a file from S3
// const getFile = async (key) => {
//   const params = {
//     Bucket: process.env.AWS_BUCKET_NAME,
//     Key: key,
//   };

//   try {
//     const data = await s3.getObject(params).promise();
//     return data.Body;
//   } catch (error) {
//     throw new Error('Error fetching file: ' + error.message);
//   }
// };

// module.exports = {
//   uploadFile,
//   getFile,
// };

import { S3Client, PutObjectCommand, DeleteObjectCommand, GetObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";

import dotenv from 'dotenv'

dotenv.config()



const bucketName = process.env.AWS_BUCKET_NAME
const region = process.env.AWS_BUCKET_REGION
const accessKeyId = process.env.AWS_ACCESS_KEY
const secretAccessKey = process.env.AWS_SECRET_ACCESS_KEY

const s3Client = new S3Client({
  region,
  credentials: {
    accessKeyId,
    secretAccessKey
  }
})


export function uploadFile(fileBuffer, fileName, mimetype) {
  const uploadParams = {
    Bucket: bucketName,
    Body: fileBuffer,
    Key: fileName,
    ContentType: mimetype
  }

  return s3Client.send(new PutObjectCommand(uploadParams));
}

export function deleteFile(fileName) {
  const deleteParams = {
    Bucket: bucketName,
    Key: fileName,
  }

  return s3Client.send(new DeleteObjectCommand(deleteParams));
}

export async function getObjectSignedUrl(key) {
  const params = {
    Bucket: bucketName,
    Key: key
  }

  // https://aws.amazon.com/blogs/developer/generate-presigned-url-modular-aws-sdk-javascript/
  const command = new GetObjectCommand(params);
  const seconds = 60
  const url = await getSignedUrl(s3Client, command, { expiresIn: seconds });

  return url
}