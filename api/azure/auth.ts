"use strict";

import { decode } from "jsonwebtoken";

import response from "../../util/response";
import {
  getSigningKey,
  getToken,
  verifyJwt,
  verifyToken,
} from "../../lib/authentication";
import logger from "../../logger";
import { createUnAuthorizedError } from "../../lib/breakers";

const { TOKEN_ISSUER, AUDIENCE } = process.env;

export const auth0 = async (context, event) => {
  return new Promise(async (resolve, reject) => {
    try {
      const token = getToken(event);
      const verifiedData = await verifyToken(
        token,
        decode,
        getSigningKey,
        verifyJwt,
        TOKEN_ISSUER,
        AUDIENCE
      );
      const authResponse = {
        principalId: verifiedData.sub,
        policyDocument: {
          Version: "2012-10-17",
          Statement: [
            {
              Action: "execute-api:Invoke",
              Effect: "Allow",
              Resource: event.methodArn,
            },
          ],
        },
      };
      resolve(authResponse);
    } catch (error) {
      logger.error(error);
      reject(createUnAuthorizedError());
    }
  });
};
