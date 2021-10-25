import response from "../util/response";
import { BadRequest } from "../lib/breakers";
import ReportSvc from "../service/ReportSvc";
import { ALLOWED_MIME_TYPE } from "../constant/allowedInput";

export const find = async (event) => {
  try {
    const data = await ReportSvc.getRecords();
    return response.create(200, {
      data,
    });
  } catch (error) {
    return response.failed(error);
  }
};

export const findOne = async (event) => {
  try {
    const data = await ReportSvc.getRecord(event?.pathParameters?.id);
    return response.create(200, {
      data,
    });
  } catch (error) {
    return response.failed(error);
  }
};

export const findAttachment = async (event) => {
  try {
    const data = await ReportSvc.getAttachment(event?.pathParameters?.id);
    return response.create(200, {
      data,
    });
  } catch (error) {
    return response.failed(error);
  }
};

export const save = async (event) => {
  try {
    const { image, mime, description } = JSON.parse(event.body);
    if (!description) {
      BadRequest();
    }
    let isAttachment = true
    if (image || mime){
      if(!ALLOWED_MIME_TYPE.includes(mime)) {
        BadRequest();
      }
    } else {
      isAttachment = false
    }

    const data = await ReportSvc.saveRecord(
      {
        description,
      },
      {
        image,
        mime,
      },
      "s3",
      isAttachment
    );

    // const url = `https://${process.env.imageUploadBucket}.s3-${process.env.region}.amazonaws.com/${key}`;
    return response.create(200, {
      data,
    });
  } catch (error) {
    console.log({ error });
    return response.failed(error);
  }
};
