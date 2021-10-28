export const sendEmail = async (body) => {
  return new Promise(async (resolve, reject) => {
    try {
      const sgMail = await import("@sendgrid/mail");
      sgMail.setApiKey(process.env.SENDGRID_API_KEY);
      const msg = {
        to: process.env.RECEIVER_EMAIL,
        from: process.env.SENDER_EMAIL,
        subject: `[${body.id}] - Incident Reported`,
        html: `<p><b>ID: </b>${body.id}</p><br><p><b>Description: </b>${body.description}</p><br><p><b>Attachment: </b>${body.attachmentURL}</p>`,
      };
      const response = await sgMail.send(msg);
      resolve(response);
    } catch (error) {
      console.log({ error });
      reject(error);
    }
  });
};
