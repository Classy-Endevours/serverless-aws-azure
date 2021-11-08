import response from "../util/response";
import { BadRequest } from "../lib/breakers";
import ReportSvc from "../service/ReportSvc";
import { ALLOWED_MIME_TYPE, EMAIL_REGEX } from "../constant/allowedInput";
import { PLATFORM } from "../constant/app";
import logger from "../logger";
import { statusEnum, updateStatusDto } from "../interfaces/service";

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
    if(isNaN(event?.pathParameters?.id)) {
      BadRequest();
    }
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
    if(isNaN(event?.pathParameters?.id)) {
      BadRequest();
    }
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
    const { attachment, mime, description, email = null } = JSON.parse(event.body);
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
        email
      },
      {
        attachment,
        mime,
      },
      PLATFORM.OBJECT_STORAGE.S3,
      isAttachment
    );
    return response.create(200, {
      data,
    });
  } catch (error) {
    logger.error(error)
    return response.failed(error);
  }
};

export const updateStatus = async (event) => {
  try {
    if (isNaN(event?.pathParameters?.id)) {
      BadRequest();
    }
    const { status, comments = "" } = JSON.parse(event.body);
    if (!status && !Object.values(statusEnum)?.includes(status)) {
      BadRequest();
    }
    const input: updateStatusDto = {
      status,
    };
    if (comments != "") {
      input.comments = comments;
    }
    const data = await ReportSvc.updateStatus(event?.pathParameters?.id, input);
    return response.create(200, {
      data,
    });
  } catch (error) {
    logger.error(error)
    return response.failed(error);
  }
};

export const findStatus = async (event) => {
  try {

    if(isNaN(event?.pathParameters?.id)) {
      BadRequest();
    }
    const data = await ReportSvc.getStatus(event?.pathParameters?.id);    
    return response.create(200, {
      data,
    });
  } catch (error) {
    logger.error(error)
    return response.failed(error);
  }
};
