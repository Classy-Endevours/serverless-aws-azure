import response from "../../util/response";
import { BadRequest } from "../../lib/breakers";
import ReportSvc from "../../service/ReportSvc";
import { ALLOWED_MIME_TYPE, EMAIL_REGEX } from "../../constant/allowedInput";
import { auth0 } from "./auth";
import { PLATFORM } from "../../constant/app";
import { statusEnum, updateStatusDto } from "../../interfaces/service";

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
    if(isNaN(context?.bindingData?.id)) {
      BadRequest();
    }
    const data = await ReportSvc.getRecord(context?.bindingData?.id);
    context.res = response.createAzure(200, data);
  } catch (error) {
    context.res = response.failedAzure(error);
  }
};

export const findAttachment = async (context, event) => {
  try {
    const authResponse = await auth0(context, event);
    if(isNaN(context?.bindingData?.id)) {
      BadRequest();
    }
    const data = await ReportSvc.getAttachment(context?.bindingData?.id);
    context.res = response.createAzure(200, data);
  } catch (error) {
    context.res = response.failedAzure(error);
  }
};

export const save = async (context, event) => {
  try {
    const { attachment="", mime="", description, email = null } = event.body;
    if (!description) {
      BadRequest();
    }

    if(email && !EMAIL_REGEX.test(email)) {
      BadRequest();
    }

    let isAttachment = true
    if (attachment && mime){
      if(!ALLOWED_MIME_TYPE.includes(mime)) {
        BadRequest();
      }
    } else {
      isAttachment = false
    }

    const data = await ReportSvc.saveRecord(
      {
        description,
        email,
      },
      {
        attachment,
        mime,
      },
      PLATFORM.OBJECT_STORAGE.AZURE,
      isAttachment
    );

    // const url = `https://${process.env.imageUploadBucket}.s3-${process.env.region}.amazonaws.com/${key}`;
    context.res = response.createAzure(200, data);
  } catch (error) {
    context.res = response.failedAzure(error);
  }
};

export const updateStatus = async (context, event) => {
  try {
    const authResponse = await auth0(context, event);
    if (isNaN(context?.bindingData?.id)) {
      BadRequest();
    }
    const { status, comments = "" } = event.body;
    if (!status || !Object.values(statusEnum)?.includes(status)) {
      BadRequest();
    }
    const input: updateStatusDto = {
      status,
    };
    if (comments != "") {
      input.comments = comments;
    }
    const data = await ReportSvc.updateStatus(context?.bindingData?.id, input);
    context.res = response.createAzure(200, data);
  } catch (error) {
    context.res = response.failedAzure(error);
  }
};

export const findStatus = async (context, event) => {
  try {
    const authResponse = await auth0(context, event);
    if(isNaN(context?.bindingData?.id)) {
      BadRequest();
    }
    const data = await ReportSvc.getStatus(context?.bindingData?.id);
    context.res = response.createAzure(200, data);
  } catch (error) {
    context.res = response.failedAzure(error);
  }
};