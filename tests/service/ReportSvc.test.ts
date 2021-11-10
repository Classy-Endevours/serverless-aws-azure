import ReportSvc from "../../service/ReportSvc";
import reportRepo from "../../repo/ReportRepo";
import CustomError from "../../util/customError";
import { report } from "../__mocks__/input";
import { PLATFORM } from "../../constant/app";

jest.mock("../../repo/ReportRepo");

jest.mock("../../lib/uploadObject", () => ({
  uploadObject: () => "some-random-url",
}));

jest.mock("../../lib/sendEmail", () => ({
  sendEmail: () => ({ code: 200 }),
  sendInternalMail: () => ({ code: 200 }),
  sendExternalMail: () => ({ code: 200 }),
  createRecordBody: () => ({ subject: "test", html: "empty" }),
  updateStatusBody: () => ({ subject: "test", html: "empty" }),
}));

describe("Get Records test cases", () => {
  it("should return an array of object", async () => {
    const mockFn = jest.fn().mockReturnValue(["worked"]);
    reportRepo.find = mockFn;
    const response: any = await ReportSvc.getRecords();
    expect(response).toEqual(expect.any(Array));
    expect(response.length).toEqual(1);
  });
  it("should return an error when find repo failed", async () => {
    const mockFn = jest.fn().mockRejectedValue("failed");
    reportRepo.find = mockFn;
    try {
      const response = await ReportSvc.getRecords();
    } catch (error) {
      expect(error).toEqual("failed");
    }
  });
});

describe("Get Record test cases", () => {
  it("should return object if id is valid", async () => {
    const mockFn = jest.fn().mockReturnValue(["worked"]);
    reportRepo.findUnique = mockFn;
    const response = await ReportSvc.getRecord("1");
    expect(response).toEqual(expect.any(Object));
  });
  it("should return an error when find repo failed", async () => {
    const mockFn = jest.fn().mockRejectedValue("failed");
    reportRepo.findUnique = mockFn;
    try {
      const response = await ReportSvc.getRecord(null);
    } catch (error) {
      expect(error).toEqual("failed");
    }
  });

  it("should return an error when no record is found", async () => {
    const mockFn = jest.fn().mockResolvedValue(null);
    reportRepo.findUnique = mockFn;
    try {
      const response = await ReportSvc.getRecord(null);
    } catch (error) {
      expect(error).toEqual(
        new CustomError("No Record Found", {
          message: "There is no record present for the request!",
          code: 404,
        })
      );
    }
  });
});

describe("Get Attachments test cases", () => {
  it("should return object if id is valid", async () => {
    const mockFn = jest.fn().mockReturnValue({
      attachmentURL: "test",
    });
    reportRepo.findUnique = mockFn;
    const response = await ReportSvc.getAttachment("1");
    expect(response).toEqual(expect.any(Object));
  });

  it("should return an error when find repo failed", async () => {
    const mockFn = jest.fn().mockRejectedValue("failed");
    reportRepo.findUnique = mockFn;
    try {
      const response = await ReportSvc.getAttachment(null);
    } catch (error) {
      expect(error).toEqual("failed");
    }
  });

  it("should return an error when no record is found", async () => {
    const mockFn = jest.fn().mockResolvedValue(null);
    reportRepo.findUnique = mockFn;
    try {
      const response = await ReportSvc.getAttachment(null);
    } catch (error) {
      expect(error).toEqual(
        new CustomError("No Record Found", {
          message: "There is no record present for the request!",
          code: 404,
        })
      );
    }
  });
});

describe("Save Report test cases", () => {
  it("should save user reports for right input", async () => {
    const mockFn = jest.fn().mockReturnValue(["worked"]);
    reportRepo.create = mockFn;
    const response: any = await ReportSvc.saveRecord(
      report.saveService.success.input,
      report.saveService.success.fileInput,
      PLATFORM.OBJECT_STORAGE.S3
    );
    expect(response).toEqual(expect.any(Array));
    expect(response.length).toEqual(1);
  });
  it("should save user reports for right input and attachment", async () => {
    const mockFn = jest.fn().mockReturnValue(["worked"]);
    reportRepo.create = mockFn;
    const response: any = await ReportSvc.saveRecord(
      report.saveService.success.input,
      report.saveService.success.fileInput,
      PLATFORM.OBJECT_STORAGE.S3,
      true
    );
    expect(response).toEqual(expect.any(Array));
    expect(response.length).toEqual(1);
  });
  it("should throw error for anything went wrong on create function", async () => {
    const mockFn = jest.fn().mockRejectedValue("failed");
    reportRepo.create = mockFn;
    try {
      const response: any = await ReportSvc.saveRecord(
        report.saveService.success.input,
        report.saveService.success.fileInput,
        PLATFORM.OBJECT_STORAGE.S3,
        true
      );
    } catch (error) {
      expect(error).toEqual("failed");
    }
  });
});
