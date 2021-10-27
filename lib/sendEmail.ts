export const sendEmail = async (body) => {
  return new Promise(async (resolve, reject) => {
    try {
      const sgMail = await import("@sendgrid/mail");
      sgMail.setApiKey(process.env.SENDGRID_API_KEY);
      const msg = {
        to: "manthanmehta810@gmail.com", // Change to your recipient
        from: "manthanmehta81096@gmail.com", // Change to your verified sender
        subject: `[${body.id}] - Incident Reported`,
        html: JSON.stringify(body),
      };
      const response = await sgMail.send(msg);
      resolve(response);
    } catch (error) {
      console.log({ error });
      reject(error);
    }
  });
};
