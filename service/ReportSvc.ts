import { whereInterface } from "../interfaces/database";
import { createReportDto, fileInputDto, reportInterface, saveReportInterface, updateStatusDto } from "../interfaces/service";
import { NoRecordFound } from "../lib/breakers";
import reportRepo from "../repo/ReportRepo";
import logger from "../logger";
import { uploadObject } from "../lib/uploadObject";
import { sendInternalMail, sendExternalMail, createRecordBody, updateStatusBody } from "../lib/sendEmail";

class ReportSvc {
  static getRecords = async () => {
    return new Promise(async (resolve, reject) => {
      try {
        const data = await reportRepo.find({
          include: {
            statusReports: true,
          },
        });
        resolve(data);
      } catch (error) {
        reject(error);
      }
    });
  };

  static getRecord = async (id?: string) => {
    return new Promise(async (resolve, reject) => {
      try {
        const where: whereInterface = {};
        if (id) {
          where.id = parseInt(id);
        }
        const data = await reportRepo.findUnique({
          where,
          include: {
            statusReports: true,
          },
        });
        if (!data) {
          NoRecordFound();
        }
        resolve(data);
      } catch (error) {
        reject(error);
      }
    });
  };

  static getAttachment = async (id?: string) => {
    return new Promise(async (resolve, reject) => {
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
        reject(error);
      }
    });
  };
  
  static getStatus = async (id?: string) => {
    return new Promise(async (resolve, reject) => {
      try {
        const where: whereInterface = {};
        if (id) {
          where.id = parseInt(id);
        }
        const data = await reportRepo.findUnique({
          where,
          select: {
            statusReports: true,
          }
        });
        if (!data) {
          NoRecordFound();
        } else if (data.statusReports.length <= 0) {
          NoRecordFound();
        }
        resolve(data);
      } catch (error) {
        reject(error);
      }
    });
  };

  static saveRecord = async (
    input: createReportDto,
    fileInput: fileInputDto,
    platform: String,
    isAttachment: Boolean = false
  ) => {
    return new Promise(async (resolve, reject) => {
      try {
        const { description, email } = input;
        const record: saveReportInterface = {
          data: {
            description,
            email,
            statusReports: {
              create: [
                {
                  status: "new",
                },
              ],
            },
          },
          include: {
            statusReports: true,
          },
        };
        if (isAttachment) {
          const attachmentURL: any = await uploadObject(fileInput, platform);
          record.data.attachmentURL = attachmentURL;
        }
        const data = await reportRepo.create(record);
        const sendBody = await createRecordBody(data)
        const emailData = await sendInternalMail(sendBody);
        if(email) {
          const userEmailData = await sendExternalMail([email], sendBody)
        }
        resolve(data);
      } catch (error) {
        logger.error('ReportSvc::saveRecord::catch:: ', error)
        reject(error);
      }
    });
  };

  static updateStatus = async (id?: string, input?: updateStatusDto) => {
    return new Promise(async (resolve, reject) => {
      try {
        const where: whereInterface = {};
        if (id) {
          where.id = parseInt(id);
        }
        const reportData = await reportRepo.findUnique({
          where,
        });
        if (!reportData) {
          NoRecordFound();
        }
        const data = await reportRepo.update({
          where: {
            id: parseInt(id),
          },
          data: {
            statusReports: {
              create: input,
            },
          },
          include: {
            statusReports: true,
          },
        });
        if (!data) {
          NoRecordFound();
        }
        if(data.email) {
          const sendBody = await updateStatusBody(data, input)
          const userEmailData = await sendExternalMail([data.email], sendBody)
        }
        resolve(data);
      } catch (error) {
        logger.error('ReportSvc::updateStatus::catch:: ', error)
        reject(error);
      }
    });
  };
}

export default ReportSvc;
