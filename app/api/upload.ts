import type { NextApiRequest, NextApiResponse } from 'next';
import { default as nc } from 'next-connect';
import multer from 'multer';
import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import { NextHandler } from 'next-connect';

// Configure Multer
const upload = multer({ storage: multer.memoryStorage() });

// Configure AWS S3 Client
const S3 = new S3Client({
    region: "auto",
    endpoint: `https://${process.env.ACCOUNT_ID}.r2.cloudflarestorage.com`,
    credentials: {
      accessKeyId: process.env.ACCESS_KEY_ID!,
      secretAccessKey: process.env.SECRET_ACCESS_KEY!,
    },
  });

const handler = nc<NextApiRequest, NextApiResponse>({
  onError: (err: any, req: NextApiRequest, res: NextApiResponse, next: NextHandler) => {
    console.error(err.stack);
    res.status(500).end("Something broke!");
  },
  onNoMatch: (req: NextApiRequest, res: NextApiResponse) => {
    res.status(404).end("Page is not found");
  },
});

handler.use(upload.single('file'));

handler.post(async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const { file } = req;
    if (!file) {
      return res.status(400).send('No file uploaded');
    }

    // Upload file to S3
    const command = new PutObjectCommand({
      Bucket: 'musephoria-music',
      Key: file.originalname,
      Body: file.buffer,
      ContentType: file.mimetype,
    });

    await S3.send(command);

    res.status(200).send({ message: "File uploaded successfully" });
  } catch (error) {
    res.status(500).send({ message: "Error uploading file" });
  }
});

export default handler;