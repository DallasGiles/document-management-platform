import { S3Client, PutObjectCommand, DeleteObjectCommand, GetObjectCommand } from "@aws-sdk/client-s3";
import { Upload } from '@aws-sdk/lib-storage';
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import crypto from 'crypto';
import dotenv from 'dotenv';

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

// TODO: Make sure AWS S3 values are properly aligned with db values

export async function uploadFile(fileStream, fileName, mimetype) {
  console.log('uploadFile', fileName, accessKeyId, secretAccessKey, bucketName, region);
  const uniqueName = randomImageName();
  const uploadParams = {
    Bucket: bucketName,
    Body: fileStream,
    Key: uniqueName,
    ContentType: mimetype
  }

  const uploads = new Upload({
    client: s3Client,
    params: uploadParams
  });

  uploads.on('httpUploadProgress', (progress) => {
    console.log('upload progress', progress);
  });

  const result = await uploads.done();

  console.log('uploads done', result);
  return result;
  // return s3Client.send(new PutObjectCommand(uploadParams));
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
  const seconds = 3600
  const url = await getSignedUrl(s3Client, command, { expiresIn: seconds });

  return url
}