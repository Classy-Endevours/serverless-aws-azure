import { findOne, save } from "../../api/report";
import { prisma } from "../../repo";
import fakeData from "../__mocks__/faker";
import * as AWS from "aws-sdk";
const s3 = new AWS.S3();


jest.mock("../../lib/sendEmail", () => ({
  sendEmail: () => ({ code: 200 }),
  sendInternalMail: () => ({ code: 200 }),
  sendExternalMail: () => ({ code: 200 }),
  createRecordBody: () => ({ subject: "test", html: "empty" }),
  updateStatusBody: () => ({ subject: "test", html: "empty" }),
}));

describe("Integration test for find One api", () => {
  beforeEach(async () => {
    await prisma.statusReports.deleteMany();
    await prisma.reports.deleteMany();
  });
  afterAll(async () => {
    await prisma.statusReports.deleteMany();
    await prisma.reports.deleteMany();
    await prisma.$disconnect();
    // We can't delete a bucket before emptying its contents
    const { Contents } = await s3.listObjects({ Bucket: process.env.imageUploadBucket }).promise();
    if (Contents.length > 0) {
      await s3
        .deleteObjects({
          Bucket: process.env.imageUploadBucket,
          Delete: {
            Objects: Contents.map(({ Key }) => ({ Key }))
          }
        })
        .promise();
    }
  });
  it("should return 200 if entry is saved for one record with id", async () => {
    const fake = fakeData.reports.oneReport();
    const inputResponse: any = await save({
      body: JSON.stringify({
        description: fake.description,
      }),
    });
    const body = JSON.parse(inputResponse.body).data
    const response = await findOne({
      pathParameters: {
        id: body.id,
      },
    });
    expect(response?.statusCode).toEqual(200);
    expect(JSON.parse(response?.body).data.id).toEqual(body.id);
  });
  it("should return 200 if entry is saved for one record with id with the attachment", async () => {
    const fake = fakeData.reports.oneAPIReport();
    const inputResponse: any = await save({
      body: JSON.stringify({
        description: fake.description,
        attachment: fake.attachment,
        mime: fake.mime
      }),
    });
    const body = JSON.parse(inputResponse.body).data
    
    const response = await findOne({
      pathParameters: {
        id: body.id,
      },
    });
    expect(response?.statusCode).toEqual(200);
    expect(JSON.parse(response?.body).data.id).toEqual(body.id);
    expect(JSON.parse(response?.body).data.attachmentURL).not.toBe(null)
  });
});
