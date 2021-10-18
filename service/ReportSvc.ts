import { v4 as uuid } from "uuid";
import * as fileType from "file-type";
import { whereInterface } from "../interfaces/database";
import { createReportDto, fileInputDto } from "../interfaces/service";
import { BadRequest } from "../lib/breakers";
import reportRepo from "../repo/ReportRepo";
import logger from "../logger";
import { uploadObject } from "../lib/s3";

class ReportSvc {
  static getRecords = async (id?: string) => {
    const where: whereInterface = {};
    if (id) {
      where.id = parseInt(id);
    }
    const data = await reportRepo.find({
      where,
    });
    return data;
  };

  static saveRecord = async (
    input: createReportDto,
    fileInput: fileInputDto
  ) => {
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
        console.log({ buc: process.env.imageUploadBucket });

        const uploader = await uploadObject({
          Body: buffer,
          Key: key,
          ContentType: mime,
          Bucket: process.env.imageUploadBucket || "",
          ACL: "public-read",
        });
        resolve(uploader);
      } catch (error) {
        reject(error);
      }
    });
  };
}

export default ReportSvc;
