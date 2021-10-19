import CustomError from "../../util/customError";

const sampleMessage = "A new test created";
const sampleData = {
  key: "value",
};

describe("Custom Error test cases", () => {
  it("should be an instance of error", (done) => {
    const newError = new CustomError(sampleMessage, sampleData);
    expect(newError).toEqual(expect.any(Error));
    done();
  });
  it("should have same response as given", (done) => {
    const newError = new CustomError(sampleMessage, sampleData);
    expect(newError.data).toEqual(sampleData);
    expect(newError.message).toEqual(sampleMessage);
    done();
  });
});
