import logger from "../logger";

export const sendEmail = async (body) => {
  return new Promise(async (resolve, reject) => {
    try {
      const emailResponse = {
        code: 200,
        data: null
      }
      if(process.env.NODE_ENV != 'test') {
        emailResponse.code = 400
        resolve(emailResponse)
      }
      const sgMail = await import("@sendgrid/mail");
      sgMail.setApiKey(process.env.SENDGRID_API_KEY);
      const msg = {
        to: process.env.RECEIVER_EMAIL,
        from: process.env.SENDER_EMAIL,
        subject: `[${body.id}] - Incident Reported`,
        html: `<p><b>ID: </b>${body.id}</p><br><p><b>Description: </b>${body.description}</p><br><p><b>Attachment: </b>${body.attachmentURL}</p>`,
      };
      const response = await sgMail.send(msg);
      emailResponse.data = response
      resolve(emailResponse);
    } catch (error) {
      logger.error({ error });
      reject(error);
    }
  });
};
