import { findStatus, save, find } from "../../api/azure/report";
import { prisma } from "../../repo";
import fakeData from "../__mocks__/faker";
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
  beforeEach(async () => {
    await prisma.statusReports.deleteMany();
    await prisma.reports.deleteMany();
  });
  afterAll(async () => {
    await prisma.statusReports.deleteMany();
    await prisma.reports.deleteMany();
    await prisma.$disconnect();
  });
  it("should return 200 if entry of status is present for one record with id", async () => {
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
    await findStatus(statusContext, {});
    expect(statusContext?.res.status).toEqual(200);
    expect(statusContext?.res.body.data.length).toBeGreaterThanOrEqual(1);
  });
  it("should return 404 if entry is not present for one record with id", async () => {
    const fake = fakeData.reports.oneReport();
    const context: any = {};

    const inputResponse: any = await save(context, {
      body: {
        description: fake.description,
      },
    });
    const body = context?.res.body.data;
    const statusContext: any = {
      bindingData: {
        id: body.id + 1000,
      },
    };
    await findStatus(statusContext, {});
    expect(statusContext?.res.status).toEqual(404);
  });
});