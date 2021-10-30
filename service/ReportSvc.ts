import { v4 as uuid } from "uuid";
import * as fileType from "file-type";
import { whereInterface } from "../interfaces/database";
import { createReportDto, fileInputDto, reportInterface } from "../interfaces/service";
import { BadRequest, NoRecordFound } from "../lib/breakers";
import reportRepo from "../repo/ReportRepo";
import logger from "../logger";
import { uploadObject } from "../lib/uploadObject";
import { sendEmail } from "../lib/sendEmail";

class ReportSvc {
  static getRecords = async () => {
    return new Promise(async(resolve, reject)=>{
      try {
        const data = await reportRepo.find({});
        resolve(data);
      } catch (error) {
        reject(error)
      }
    })
  };

  static getRecord = async (id?: string) => {
    return new Promise(async(resolve, reject)=>{
      try {
        const where: whereInterface = {};
        if (id) {
          where.id = parseInt(id);
        }
        const data = await reportRepo.findUnique({
          where,
        });
        if(!data) {
          NoRecordFound();
        }
        resolve(data);
      } catch (error) {
        reject(error) 
      }
    })
  };

  static getAttachment = async (id?: string) => {
    return new Promise(async(resolve, reject)=>{
      try {
        const where: whereInterface = {};
        if (id) {
          where.id = parseInt(id);
        }
        const data = await reportRepo.findUnique({
          where,
          select: {
            attachmentURL: true,
          },
        });
        if(!data) {
          NoRecordFound();
        }
        resolve(data);
      } catch (error) {
        reject(error)
      }
    })
  };

  static saveRecord = async (
    input: createReportDto,
    fileInput: fileInputDto,
    platform: String,
    isAttachment: Boolean = false
  ) => {
    return new Promise(async (resolve, reject) => {
      try {
        const { description } = input;
        const record: reportInterface = {
          description
        }
        if(isAttachment) {
          const attachmentURL: any = await uploadObject(fileInput, platform);
          record.attachmentURL = attachmentURL;
        }
        const data = await reportRepo.create(record);
        const emailData = await sendEmail(data)
        resolve(data);
      } catch (error) {
        reject(error);
      }
    });
  };
}

export default ReportSvc;
