import { findStatus, save, find } from "../../api/report";
import { prisma } from "../../repo";
import fakeData from "../__mocks__/faker";

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
    const inputResponse: any = await save({
      body: JSON.stringify({
        description: fake.description,
      }),
    });
    const body = JSON.parse(inputResponse.body).data
    const response = await findStatus({
      pathParameters: {
        id: body.id
      }
    });
    expect(response?.statusCode).toEqual(200);
    expect(JSON.parse(response?.body).data.length).toBeGreaterThanOrEqual(1);
  });
  it("should return 404 if entry is not present for one record with id", async () => {
    const fake = fakeData.reports.oneReport();
    const inputResponse: any = await save({
      body: JSON.stringify({
        description: fake.description,
      }),
    });
    const body = JSON.parse(inputResponse.body).data
    const response = await findStatus({
      pathParameters: {
        id: body.id + 1000
      }
    });
    expect(response?.statusCode).toEqual(404);
  });
});