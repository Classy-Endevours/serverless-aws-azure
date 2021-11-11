import { find } from "../../api/report";
import { prisma } from "../../repo";
import fakeData from "../__mocks__/faker";

describe("Integration test for find api", () => {
  beforeEach(async () => {
    await prisma.statusReports.deleteMany();
    await prisma.reports.deleteMany();
  });
  afterAll(async () => {
    await prisma.statusReports.deleteMany();
    await prisma.reports.deleteMany();
    await prisma.$disconnect();
  });
  it("should return 200 with one entry in database for find", async () => {
    const input: any = fakeData.reports.oneReport();
    await prisma.reports.create({
      data: input,
    });
    const response = await find({});
    expect(response?.statusCode).toEqual(200);
    expect(JSON.parse(response?.body).data.length).toEqual(1);
    expect(JSON.parse(response?.body).data[0].description).toEqual(
      input.description
    );
  });
  it("should return 200 with more than one entry in database for find", async () => {
    const input: any = fakeData.reports.manyReport(4);
    await prisma.reports.createMany({
      data: input,
    });
    const response = await find({});
    expect(response?.statusCode).toEqual(200);
    expect(JSON.parse(response?.body).data.length).toEqual(input.length);
  });
});
