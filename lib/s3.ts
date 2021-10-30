import * as AWS from "aws-sdk";
import logger from "../logger";
const s3 = new AWS.S3();

export const S3UploadObject = async (body) => {
  return new Promise((resolve, reject) => {
    try {
      s3.putObject(body, function (err, data) {
        if (err) {
          logger.error("Some error occurred: ", err);
          reject(err);
        }
        const attachmentURL = `https://${process.env.imageUploadBucket}.s3.amazonaws.com/${body.Key}`;
        resolve(attachmentURL);
      });
    } catch (error) {
      logger.error("Error.uploadObject.catch: ", error);
      reject(error);
    }
  });
};
