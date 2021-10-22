import * as AWS from "aws-sdk";
// AWS.config.update({
//   accessKeyId: process.env.AWS_ACCESS_KEY_ID,
//   secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
//   region: "us-east-1",
// });
const s3 = new AWS.S3();

export const S3UploadObject = async (body) => {
  return new Promise((resolve, reject) => {
    try {
      s3.putObject(body, function (err, data) {
        if (err) {
          console.log("Some error occurred: ", err);
          reject(err);
        }
        const attachmentURL = `https://${process.env.imageUploadBucket}.s3.amazonaws.com/${body.key}`;
        resolve(attachmentURL);
      });
    } catch (error) {
      console.log("Error.uploadObject.catch: ", error);
      reject(error);
    }
  });
};
