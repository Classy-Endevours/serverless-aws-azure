import * as AWS from "aws-sdk";
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
