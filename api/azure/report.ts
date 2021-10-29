import response from "../../util/response";
import { BadRequest } from "../../lib/breakers";
import ReportSvc from "../../service/ReportSvc";
import { ALLOWED_MIME_TYPE } from "../../constant/allowedInput";
import { auth0 } from "./auth";

export const find = async (context, event) => {
  try {
    const authResponse = await auth0(context, event);
    const data = await ReportSvc.getRecords();
    context.res = response.createAzure(200, data);
  } catch (error) {
    context.res = response.failedAzure(error);
  }
};

export const findOne = async (context, event) => {
  try {
    const authResponse = await auth0(context, event);
    const data = await ReportSvc.getRecord(context?.bindingData?.id);
    context.res = response.createAzure(200, data);
  } catch (error) {
    context.res = response.failedAzure(error);
  }
};

export const findAttachment = async (context, event) => {
  try {
    const authResponse = await auth0(context, event);
    const data = await ReportSvc.getAttachment(context?.bindingData?.id);
    context.res = response.createAzure(200, data);
  } catch (error) {
    context.res = response.failedAzure(error);
  }
};

export const save = async (context, event) => {
  try {
    // const authResponse = await auth0(context, event);
    const { attachment="", mime="", description } = event.body;
    if (!description) {
      BadRequest();
    }
    let isAttachment = true
    if (attachment || mime){
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
        attachment,
        mime,
      },
      "azure",
      isAttachment
    );

    // const url = `https://${process.env.imageUploadBucket}.s3-${process.env.region}.amazonaws.com/${key}`;
    context.res = response.createAzure(200, data);
  } catch (error) {
    context.res = response.failedAzure(error);
  }
};
