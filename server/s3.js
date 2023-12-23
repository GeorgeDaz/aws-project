require("dotenv").config();
require("@aws-sdk/client-s3");
const fs = require("fs");
const {
  S3Client,
  GetObjectCommand,
  PutObjectCommand,
} = require("@aws-sdk/client-s3");

const AWS_BUCKET_NAME = process.env.AWS_BUCKET_NAME;
const AWS_BUCKET_REGION = process.env.AWS_BUCKET_REGION;
const AWS_PUBLIC_KEY = process.env.AWS_PUBLIC_KEY;
const AWS_SECRET_KEY = process.env.AWS_SECRET_KEY;

const client = new S3Client({
  region: AWS_BUCKET_REGION,
  credentials: {
    accessKeyId: AWS_PUBLIC_KEY,
    secretAccessKey: AWS_SECRET_KEY,
  },
});

async function UploadFile(file) {
  const stream = fs.createReadStream(file.tempFilePath);

  const uploadParams = {
    Bucket: AWS_BUCKET_NAME,
    Key: file.name,
    Body: stream,
  };

  const command = new PutObjectCommand(uploadParams);
  return await client.send(command);
}

async function readData(fileName) {
  const command = new GetObjectCommand({
    Bucket: AWS_BUCKET_NAME,
    Key: "BUNKER EL VIEJO BAR.mp4",
  });
  const result = await client.send(command);
  // const newFile = fs.createWriteStream('./images/newImage.png')
  result.Body.pipe(fs.createReadStream("./images/newImage.png"));
  // fs.createReadStream(result.Body).pipe(newFile)
}

module.exports = { UploadFile, readData };
