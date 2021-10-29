import ReportSvc from "../../service/ReportSvc";
import reportRepo from "../../repo/ReportRepo";
import CustomError from "../../util/customError";

jest.mock("../../repo/ReportRepo");

const sampleMessage = "A new test created";
const sampleData = {
  key: "value",
};

describe("Get Records test cases", () => {
  it("should return an array of object", async () => {
    const mockFn = jest.fn().mockReturnValue(["worked"]);
    reportRepo.find = mockFn;
    const response = await ReportSvc.getRecords();
    expect(response).toEqual(expect.any(Array));
  });
});

describe("Get Record test cases", () => {
  it("should return object if id is vaild", async () => {
    const mockFn = jest.fn().mockReturnValue(["worked"]);
    reportRepo.findUnique = mockFn;
    const response = await ReportSvc.getRecord("1");
    expect(response).toEqual(expect.any(Object));
  });
  it("should return error with code 404 if id is invaild", async () => {
    const mockFn = jest.fn().mockReturnValue(["worked"]);
    reportRepo.findUnique = mockFn;
    const response = await ReportSvc.getRecord(null);
    const newError = new CustomError(sampleMessage, {
      ...sampleData,
      code: 404,
    });
    expect(newError.data.code).toEqual(404);
  });
});


describe("Get Attachments test cases", () => {
  it("should return object if id is vaild", async () => {
    const mockFn = jest.fn().mockReturnValue(["worked"]);
    reportRepo.findUnique = mockFn;
    const response = await ReportSvc.getAttachment("1");
    expect(response).toEqual(expect.any(Object));
  });
  it("should return error with code 404 if id is invaild", async () => {
    const mockFn = jest.fn().mockReturnValue(["worked"]);
    reportRepo.findUnique = mockFn;
    const response = await ReportSvc.getAttachment(null);
    const newError = new CustomError(sampleMessage, {
      ...sampleData,
      code: 404,
    });
    expect(newError.data.code).toEqual(404);
  });
});
