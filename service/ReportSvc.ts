import { v4 as uuid } from "uuid";
import * as fileType from "file-type";
import { whereInterface } from "../interfaces/database";
import { createReportDto, fileInputDto } from "../interfaces/service";
import { BadRequest } from "../lib/breakers";
import reportRepo from "../repo/ReportRepo";
import logger from "../logger";
import { uploadObject } from "../lib/uploadObject";

class ReportSvc {
  static getRecords = async (id?: string) => {
    const where: whereInterface = {};
    if (id) {
      where.id = parseInt(id);
    }
    const data = await reportRepo.find({
      where,
    });
    return data;
  };

  static saveRecord = async (
    input: createReportDto,
    fileInput: fileInputDto
  ) => {
    return new Promise(async (resolve, reject) => {
      try {
        const { description } = input;
        const attachmentURL: any = await uploadObject(fileInput)
        const record = {
          description,
          attachmentURL
        }
        const data = await reportRepo.create(record);
        resolve(data);
      } catch (error) {
        reject(error);
      }
    });
  };
}

export default ReportSvc;
