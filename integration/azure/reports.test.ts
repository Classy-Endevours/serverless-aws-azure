import { find } from "../../api/azure/report";
import { prisma } from "../../repo";
import fakeData from "../__mocks__/faker";
jest.mock("../../api/azure/auth", () => ({
  auth0: () => ({ status: 200 }),
}));

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
  it("should return 200 with one entry in database for find azure", async () => {
    const input: any = fakeData.reports.oneReport();
    await prisma.reports.create({
      data: input,
    });
    const context: any  = {}
    await find(context, {});
    expect(context?.res.status).toEqual(200);
    expect(context?.res.body.data.length).toBeGreaterThanOrEqual(1);
    expect(context?.res.body.data[0].description).toEqual(
      input.description
    );
  });
});
