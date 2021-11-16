import { updateStatusDto } from "../interfaces/service";
import logger from "../logger";

export const sendInternalMail = async (body: any) => {
  const { RECEIVER_EMAIL, SENDER_EMAIL } = process.env;
  const tmReceiver = RECEIVER_EMAIL?.split(",");
  return await sendEmail(body, tmReceiver, SENDER_EMAIL);
};

export const sendExternalMail = async (to: string[], body: any) => {
  const { SENDER_EMAIL } = process.env;
  return await sendEmail(body, to, SENDER_EMAIL);
};

export const sendEmail = async (body: any, RECEIVER_EMAIL: string[], SENDER_EMAIL: string) => {
  return new Promise(async (resolve, reject) => {
    try {
      const emailResponse = {
        code: 200,
        data: null,
      };
      if (process.env.NODE_ENV === "test") {
        emailResponse.code = 400;
        resolve(emailResponse);
      } else {
        const sgMail = await import("@sendgrid/mail");
        sgMail.setApiKey(process.env.SENDGRID_API_KEY);
        const msg = {
          to: RECEIVER_EMAIL,
          from: SENDER_EMAIL,
          subject: body.subject,
          html: body.html,
        };
        const response = await sgMail.send(msg);
        emailResponse.data = response;
        resolve(emailResponse);
      }
    } catch (error) {
      logger.error({ error });
      reject(error);
    }
  });
};

export const createRecordBody = (body: any) => {
  return {
    subject: `[${body.id}] - Incident Reported`,
    html: `<p><b>ID: </b>${body.id}</p><br><p><b>Description: </b>${
      body.description
    }</p><br><p><b>Attachment: </b>${
      !body.attachmentURL ? "No Attachment" : body.attachmentURL
    }</p>`,
  };
};

export const updateStatusBody = (body: any, statusRecord: updateStatusDto) => {
  return {
    subject: `[${body.id}] - Incident Report - updated`,
    html: `<p><b>ID: </b>${body.id}</p><br><p><b>Status: </b>${
      statusRecord.status.toUpperCase()
    }</p><br><p><b>Comments: </b>${
      !statusRecord.comments ? "No Comments" : statusRecord.comments
    }</p>`,
  };
}