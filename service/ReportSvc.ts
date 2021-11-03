import { whereInterface } from "../interfaces/database";
import { createReportDto, fileInputDto, reportInterface } from "../interfaces/service";
import { NoRecordFound } from "../lib/breakers";
import reportRepo from "../repo/ReportRepo";
import logger from "../logger";
import { uploadObject } from "../lib/uploadObject";
import { sendInternalMail } from "../lib/sendEmail";

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
        if (!data) {
          NoRecordFound();
        } else if (!data.attachmentURL) {
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
        const emailData = await sendInternalMail(data)
        resolve(data);
      } catch (error) {
        logger.error('ReportSvc::saveRecord::catch:: ', error)
        reject(error);
      }
    });
  };
}

export default ReportSvc;
