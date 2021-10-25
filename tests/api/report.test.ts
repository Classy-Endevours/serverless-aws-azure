import { find, findOne, findAttachment, save } from "../../api/report";
import ReportSvc from "../../service/ReportSvc";
import { report } from "../__mocks__/input";

jest.mock("../../service/ReportSvc");

describe("Get report test cases", () => {
  it("should return 200 if service is valid response", async () => {
    const mockFn = jest.fn().mockReturnValue(["worked"]);
    ReportSvc.getRecords = mockFn;
    const response = await find({});
    expect(response?.statusCode).toEqual(200);
  });
  it("should return 500 if service is valid response", async () => {
    const mockFn = jest.fn().mockRejectedValue("failed");
    ReportSvc.getRecords = mockFn;
    const response = await find({});
    expect(response?.statusCode).toEqual(500);
  });
});
describe("Get one report test cases", () => {
  it("should return 500 if service is valid response", async () => {
    const mockFn = jest.fn().mockRejectedValue("failed");
    ReportSvc.getRecord = mockFn;
    const response = await findOne({});
    expect(response?.statusCode).toEqual(500);
  });
  it("should return 200 if service is valid event and response", async () => {
    const mockFn = jest.fn().mockReturnValue(["worked"]);
    ReportSvc.getRecord = mockFn;
    const response = await findOne({
      pathParameters: {
        id: 1,
      },
    });
    expect(response?.statusCode).toEqual(200);
  });
  it("should return 500 if service is valid empty event and response", async () => {
    const mockFn = jest.fn().mockRejectedValue("failed");
    ReportSvc.getRecord = mockFn;
    const response = await findOne(null);
    expect(response?.statusCode).toEqual(500);
  });
  it("should return 500 if service is valid response", async () => {
    const mockFn = jest.fn().mockRejectedValue("failed");
    ReportSvc.getRecord = mockFn;
    const response = await findOne({});
    expect(response?.statusCode).toEqual(500);
  });
});
describe("Get one report attachment test cases", () => {
  it("should return 500 if service is valid response", async () => {
    const mockFn = jest.fn().mockReturnValue(["worked"]);
    ReportSvc.getAttachment = mockFn;
    const response = await findAttachment({});
    expect(response?.statusCode).toEqual(200);
  });
  it("should return 200 if service is valid event and response", async () => {
    const mockFn = jest.fn().mockReturnValue(["worked"]);
    ReportSvc.getAttachment = mockFn;
    const response = await findAttachment({
      pathParameters: {
        id: 1,
      },
    });
    expect(response?.statusCode).toEqual(200);
  });
  it("should return 500 if service is valid empty event and response", async () => {
    const mockFn = jest.fn().mockRejectedValue("failed");
    ReportSvc.getAttachment = mockFn;
    const response = await findAttachment(null);
    expect(response?.statusCode).toEqual(500);
  });
  it("should return 500 if service is valid response", async () => {
    const mockFn = jest.fn().mockRejectedValue("failed");
    ReportSvc.getAttachment = mockFn;
    const response = await findAttachment({});
    expect(response?.statusCode).toEqual(500);
  });
});
describe("Post one report test cases", () => {
  it("should return 200 for valid input", async () => {
    const mockFn = jest.fn().mockReturnValue(["worked"]);
    ReportSvc.saveRecord = mockFn;
    const response = await save({
      body: report.save.success,
    });
    expect(response?.statusCode).toEqual(200);
  });
  it("should return 200 for partial valid input", async () => {
    const mockFn = jest.fn().mockReturnValue(["worked"]);
    ReportSvc.saveRecord = mockFn;
    const response = await save({
      body: report.save.successPartial,
    });
    expect(response?.statusCode).toEqual(200);
  });
  it("should return 400 for bad request incase description not provided", async () => {
    const mockFn = jest.fn().mockRejectedValue(["worked"]);
    ReportSvc.saveRecord = mockFn;
    const response = await save({
      body: report.save.failed,
    });
    expect(response?.statusCode).toEqual(400);
  });
  it("should return 400 for bad request incase wrong image provided provided", async () => {
    const mockFn = jest.fn().mockRejectedValue(["worked"]);
    ReportSvc.saveRecord = mockFn;
    const response = await save({
      body: report.save.failedPartial,
    });
    expect(response?.statusCode).toEqual(400);
  });
});
