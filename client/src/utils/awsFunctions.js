// Import S3 bucket functions for cloud document uploads and downloads
import { S3Client, ListBucketsCommand } from "@aws-sdk/client-s3";

const s3Client = new S3Client({
    region: "us-east-1"
});

async function listBuckets() {
    try {
        const data = await s3Client.send(new ListBucketsCommand({}));
        console.log("Success", data.Buckets);
    } catch (err) {
        console.log("Error", err);
    }
};
listBuckets();
