import { findOne, save } from "../../api/azure/report";
import { prisma } from "../../repo";
import fakeData from "../__mocks__/faker";
import { BlobServiceClient } from "@azure/storage-blob";

jest.mock("../../api/azure/auth", () => ({
  auth0: () => ({ status: 200 }),
}));

jest.mock("../../lib/sendEmail", () => ({
  sendEmail: () => ({ code: 200 }),
  sendInternalMail: () => ({ code: 200 }),
  sendExternalMail: () => ({ code: 200 }),
  createRecordBody: () => ({ subject: "test", html: "empty" }),
  updateStatusBody: () => ({ subject: "test", html: "empty" }),
}));

describe("Integration test for find One api", () => {
  beforeAll(async () => {

    const blobServiceClient = await BlobServiceClient.fromConnectionString(
      process.env.AZURE_CON_STRING
    );
    await blobServiceClient.createContainer(process.env.BLOB_CONTAINER);
  })
  beforeEach(async () => {
    await prisma.statusReports.deleteMany();
    await prisma.reports.deleteMany();
  });
  afterAll(async () => {
    await prisma.statusReports.deleteMany();
    await prisma.reports.deleteMany();
    await prisma.$disconnect();

    const blobServiceClient = await BlobServiceClient.fromConnectionString(
      process.env.AZURE_CON_STRING
    );
    await blobServiceClient.deleteContainer(process.env.BLOB_CONTAINER)
  });
  it("should return 200 if entry is saved for one record with id", async () => {
    const fake = fakeData.reports.oneReport();
    const context: any = {};
    await save(context, {
      body: {
        description: fake.description,
      },
    });
    const body = context?.res.body.data;
    const statusContext: any = {
      bindingData: {
        id: body.id,
      },
    };
    await findOne(statusContext, {});
    expect(statusContext?.res.status).toEqual(200);
    expect(statusContext?.res.body.data.id).toBeGreaterThanOrEqual(body.id);
  });
  it("should return 200 if entry is saved for one record with id with the attachment", async () => {
    const fake = fakeData.reports.oneReport();
    const context: any = {};
    const inputResponse: any = await save(context, {
      body: {
        description: fake.description,
        attachment: fake.attachment,
        mime: fake.mime
      },
    });
    const body = context?.res.body.data;
    const statusContext: any = {
      bindingData: {
        id: body.id,
      },
    };
    await findOne(statusContext, {});
    expect(statusContext?.res.status).toEqual(200);
    expect(statusContext?.res.body.data.id).toBeGreaterThanOrEqual(body.id);
    expect(statusContext?.res.body.data.attachmentURL).not.toBe(null)
  });
});
