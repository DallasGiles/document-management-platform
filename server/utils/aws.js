const { S3Client, PutObjectCommand, DeleteObjectCommand, GetObjectCommand } = require ("@aws-sdk/client-s3");
const { getSignedUrl } = require("@aws-sdk/s3-request-presigner");
const crypto = require('crypto');
const dotenv = require('dotenv');

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

const randomImageName = (bytes = 32) => crypto.randomBytes(bytes).toString('hex');


async function uploadFile(fileStream, fileName, mimetype) {
  const uniqueName = randomImageName();
  const uploadParams = {
    Bucket: bucketName,
    Body: fileStream,
    Key: uniqueName,
    ContentType: mimetype
  }

  return s3Client.send(new PutObjectCommand(uploadParams));
}

function deleteFile(fileName) {
  const deleteParams = {
    Bucket: bucketName,
    Key: fileName,
  }

  return s3Client.send(new DeleteObjectCommand(deleteParams));
}

async function getObjectSignedUrl(key) {
  const params = {
    Bucket: bucketName,
    Key: key
  }

  // https://aws.amazon.com/blogs/developer/generate-presigned-url-modular-aws-sdk-javascript/
  const command = new GetObjectCommand(params);
  const seconds = 3600
  const url = await getSignedUrl(s3Client, command, { expiresIn: seconds });

  return url
}

module.exports = { uploadFile, deleteFile, getObjectSignedUrl }