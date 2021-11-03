import { fileInputDto } from "../interfaces/service";
import logger from "../logger";
import { S3UploadObject } from "./s3";
import { v4 as uuid } from "uuid";
import * as fileType from "file-type";
import { BadRequest } from "./breakers";
import { uploadBlobStrorage } from "./blobStorage";

export const uploadObject = async (
  fileInput: fileInputDto,
  platform: String = ""
) => {
  return new Promise(async (resolve, reject) => {
    try {
      const { attachment, mime } = fileInput;
      let imageData = attachment;
      if (attachment.substr(0, 7) === "base64,") {
        imageData = attachment.substr(7, attachment.length);
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

      logger.info(`writing attachment to the bucket`);

      const uploader =
        platform != "azure"
          ? await S3UploadObject({
              Body: buffer,
              Key: key,
              ContentType: mime,
              Bucket: process.env.imageUploadBucket,
              ACL: "public-read",
            })
          : uploadBlobStrorage({
              Body: buffer,
              Key: key,
              ContentType: mime
            });
      resolve(uploader);
    } catch (error) {
      reject(error);
    }
  });
};
