import { getToken } from "../../lib/authentication";
import { getApplicationState } from "../__mocks__";

describe("Authentication test cases", () => {
  it("should get token from the header", (done) => {
    const { longLivedToken } = getApplicationState();
    const event = {
      headers: {
        Authorization: longLivedToken,
      },
    };
    const token = getToken(event);
    const [, checker]: any = longLivedToken.match(/^Bearer (.*)$/)
    expect(token).toEqual(checker);
    done();
  });
});
