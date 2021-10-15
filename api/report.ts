import * as fileType from 'file-type'
import { v4 as uuid } from 'uuid'
import response from "../util/response";
import { PrismaClient } from "@prisma/client";
import { BadRequest } from "../lib/breakers";
import { ALLOWED_MIME_TYPE } from "../constants/allowed";
import logger from '../logger';

interface condition {
  id?: number;
}


export const find = async (event, context) => {
  try {
    const prisma = new PrismaClient();
    // const id
    const where: condition = {};
    if (event?.pathParameters?.id) {
      where.id = parseInt(event.pathParameters.id);
    }
    const data = await prisma.reports.findMany({ where });
    return response.create(200, {
      data,
    });
  } catch (error) {
    context.end();
    return response.create(500, {
      err: error.message,
    });
  }
};

export const save = async (event, context) => {
  try {
    const { image, mime } = JSON.parse(event.body);
    console.log({ event });
    if (!image || !mime || !ALLOWED_MIME_TYPE.includes(mime)) {
      BadRequest();
    }
    let imageData = image;
    if (image.substr(0, 7) === "base64,") {
      imageData = image.substr(7, image.length);
    }
    const buffer = Buffer.from(imageData, 'base64')
    const fileInfo = await fileType.fromBuffer(buffer)
    const detectedExt = fileInfo?.ext
    const detectedMime = fileInfo?.mime

    if(detectedMime !== mime){
      BadRequest('Bad mime type!');
    }
    const name = uuid()
    const key = `${name}.${detectedExt}`

    logger.info(`writing image to the bucket`)
    // const result = await prisma.reports.create({
    //   data:{
    //     attachmentURL: body.attachmentURL,
    //     description: body.description
    //   }
    // })
    return response.create(200, {
      data: {
        key,
        buffer,
        contentType: mime
      },
    });
  } catch (error) {
    return response.create(500, {
      err: error.message,
    });
  }
};
