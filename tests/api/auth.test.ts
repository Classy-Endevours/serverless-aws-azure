import { auth0 } from "../../api/auth";
import { createUnAuthorizedError } from "../../lib/breakers";
import { getApplicationState } from "../__mocks__";

const { context, longLivedToken } = getApplicationState();
const unAuth = createUnAuthorizedError()

describe("Auth 0 test cases", () => {
  it("should return 401 if token is invalid or expired has given", async () => {
    return auth0(
      {
        headers: {
          Authorization: longLivedToken,
        },
      },
      context
    ).then((response: any) => {
      expect(response?.statusCode).toEqual(401);
      expect(JSON.parse(response.body).message).toEqual(unAuth.data.message)
    });
  });
});
