import response from "../../util/response";
import { BadRequest } from "../../lib/breakers";
import ReportSvc from "../../service/ReportSvc";
import { ALLOWED_MIME_TYPE } from "../../constant/allowedInput";

export const find = async (context, req) => {
  try {
    const data = await ReportSvc.getRecords();
    return context.res = {
      // status: 200, /* Defaults to 200 */
      body: data
    };
  
    // if (req.query.name || (req.body?.name)) {
    //   context.res = {
    //     // status: 200, /* Defaults to 200 */
    //     body: `Hello ${(req.query.name || req.body.name)}`
    //   };
    // } else {
    //   context.res = {
    //     status: 400,
    //     body: 'Please pass a name on the query string or in the request body'
    //   };
    // }
  } catch (error) {
    context.res = {
      status: 400,
      body: 'Please pass a name on the query string or in the request body'
    };
  }
};

export const save = async (event) => {
  try {
    const { image, mime, description } = JSON.parse(event.body);
    if (!description || !image || !mime || !ALLOWED_MIME_TYPE.includes(mime)) {
      BadRequest();
    }

    const data = await ReportSvc.saveRecord(
      {
        description,
      },
      {
        image,
        mime,
      }
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
