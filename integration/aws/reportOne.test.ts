import { findOne } from "../../api/report";
import { prisma } from "../../repo";
import fakeData from "../__mocks__/faker";

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
  it("should return 200 if entry is present for one record with id", async () => {
    const input: any = fakeData.reports.oneReport();
    const inputResponse = await prisma.reports.create({
      data: input,
    });
    const response = await findOne({
      pathParameters: {
        id: inputResponse.id
      }
    });
    expect(response?.statusCode).toEqual(200);
    expect(JSON.parse(response?.body).data.id).toEqual(inputResponse.id);
  });
  it("should return 404 if entry is not present for one record with id", async () => {
    const input: any = fakeData.reports.oneReport();
    const inputResponse = await prisma.reports.create({
      data: input,
    });
    const response = await findOne({
      pathParameters: {
        id: inputResponse.id + 1000
      }
    });
    expect(response?.statusCode).toEqual(404);
  });
});
