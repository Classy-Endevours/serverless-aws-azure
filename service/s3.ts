import * as AWS from "aws-sdk";
AWS.config.update({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: "us-east-1",
});
const s3 = new AWS.S3();

export const uploadObject = (body) => {
  return new Promise((resolve, reject) => {
    s3.putObject(body, function (err, data) {
      if (err) {
        reject(err);
      }
      resolve(data);
    });
  });
};
