import { S3Client } from "@aws-sdk/client-s3";
import 'dotenv/config'

const S3 = new S3Client({
  region: "auto",
  endpoint: R2_URL, // Replace ACCOUNT_ID
  credentials: {
    accessKeyId: ACCESS_KEY_ID,     // Replace with your access key id
    secretAccessKey: SECRET_ACCESS_KEY, // Replace with your secret access key
  },
});
