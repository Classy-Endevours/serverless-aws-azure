import { fileInputDto } from "../interfaces/service";
import logger from "../logger";
import { S3UploadObject } from "./s3";
import { v4 as uuid } from "uuid";
import * as fileType from "file-type";
import { BadRequest } from "./breakers";

export const uploadObject = async (fileInput: fileInputDto) => {
  return new Promise(async (resolve, reject) => {
    try {
      const { image, mime } = fileInput;
      let imageData = image;
      if (image.substr(0, 7) === "base64,") {
        imageData = image.substr(7, image.length);
      }
      const buffer = Buffer.from(imageData, "base64");
      const fileInfo = await fileType.fromBuffer(buffer);
      const detectedExt = fileInfo?.ext;
      const detectedMime = fileInfo?.mime;

      if (detectedMime !== mime) {
        BadRequest("Bad mime type!");
      }
      const name = uuid();
      const key = `${name}.${detectedExt}`;

      logger.info(`writing image to the bucket`);

      const uploader = await S3UploadObject({
        Body: buffer,
        Key: key,
        ContentType: mime,
        Bucket: process.env.imageUploadBucket,
        ACL: "public-read",
      });
      const attachmentURL = `https://${process.env.imageUploadBucket}.s3.amazonaws.com/${key}`;
      resolve(attachmentURL);
    } catch (error) {
      reject(error);
    }
  });
};
