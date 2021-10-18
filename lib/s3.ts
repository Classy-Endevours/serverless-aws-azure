import * as AWS from "aws-sdk";
AWS.config.update({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: "us-east-1",
});
const s3 = new AWS.S3();

export const uploadObject = async (body) => {
  return new Promise((resolve, reject) => {
    try {  
      console.log("process start: ", body, process.env.AWS_ACCESS_KEY_ID);
      s3.upload(body, function (err, data) {
        if (err) {
          console.log("Some error occurred: ", err);
          reject(err);
        }
        resolve(data);
      });
    } catch (error) {
      console.log("Error.uploadObject.catch: ", error);
      reject(error);
    }
  });
};
