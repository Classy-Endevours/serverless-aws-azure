import { find } from "../../api/report";

const output = ["test", "test-2"];
const svcPath = "../../service/ReportSvc";
jest.mock("../../service/ReportSvc", () => ({
  getRecords: jest.fn().mockResolvedValue(output),
  saveRecord: jest.fn().mockResolvedValue({}),
}));
describe("Get report test cases", () => {
  it("should return 200 if service is valid response", async () => {
    find({})
      .then((response) => {
        expect(response?.statusCode).toEqual(200);
      })
  });
});