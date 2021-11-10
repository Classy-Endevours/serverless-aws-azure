import CustomError from "../../util/customError";
import response from "../../util/response";

const sampleMessage = "A new test created";
const sampleData = {
  key: "value",
};

describe("Response test cases", () => {
  it("should create response based on error for direct error", (done) => {
    const newError = new CustomError(sampleMessage, sampleData);
    expect(response.failed(newError).statusCode).toEqual(500);
    done();
  });
  it("should create response based on error for no direct error", (done) => {
    expect(response.failed({}).statusCode).toEqual(500);
    done();
  });

  it("should create response based on error for indirect error", (done) => {
    const newError = new CustomError(sampleMessage, {
        ...sampleData,
        code: 404
    });
    expect(response.failed(newError).statusCode).toEqual(404);
    done();
  });
  it("should create response based on data", (done) => {
    const status = 200
    expect(response.create(status, sampleData).statusCode).toEqual(status);
    done();
  });
});
describe("Azure Response test cases", () => {
  it("should create response based on error for direct error", (done) => {
    const newError = new CustomError(sampleMessage, sampleData);
    expect(response.failedAzure(newError).status).toEqual(500);
    done();
  });
  it("should create response based on error for no direct error", (done) => {
    expect(response.failedAzure({}).status).toEqual(500);
    done();
  });

  it("should create response based on error for indirect error", (done) => {
    const newError = new CustomError(sampleMessage, {
        ...sampleData,
        code: 404
    });
    expect(response.failedAzure(newError).status).toEqual(404);
    done();
  });
  it("should create response based on data", (done) => {
    const status = 200
    expect(response.createAzure(status, sampleData).status).toEqual(status);
    done();
  });
});
