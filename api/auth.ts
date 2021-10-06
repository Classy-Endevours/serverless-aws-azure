"use strict";

import { decode, verify } from "jsonwebtoken";
import util = require("util");
import jwksRSA = require("jwks-rsa");

import response from "../util/response";
import { UnAuthorized } from "../lib/breakers";

const { JWKS_URI = "", TOKEN_ISSUER, AUDIENCE } = process.env;

const jwksClient = jwksRSA({
  cache: true,
  rateLimit: true,
  jwksUri: JWKS_URI,
});
const getSigningKey = util.promisify(jwksClient.getSigningKey);
const verifyJwt = util.promisify(verify);
const getToken = (event) => {

  const { Authorization: bearer } = event.headers ?? {};
  if (!bearer) {
    UnAuthorized()
  }

  const [, token] = bearer.match(/^Bearer (.*)$/) || [];
  if (!token) {
    UnAuthorized()
  }

  return token;
};
const verifyToken = async (
  token,
  decodeJwt,
  getSigningKey,
  verifyJwt,
  issuer,
  audience
) => {
  // Step 1
  const decoded = decodeJwt(token, { complete: true });

  if (!decoded || !decoded.header || !decoded.header.kid) {
    UnAuthorized()
  }

  // Step 2
  const { publicKey, rsaPublicKey } = await getSigningKey(decoded.header.kid);
  const signingKey = publicKey || rsaPublicKey;

  // Step 3
  return verifyJwt(token, signingKey, {
    issuer,
    audience,
  });
};
export const auth0 = async (event, context) => {
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
          Version: '2012-10-17',
          Statement: [
            {
              Action: 'execute-api:Invoke',
              Effect: 'Allow',
              Resource: event.methodArn
            }
          ]
        }
      };
      return authResponse;
  } catch (error) {
    console.log({
      error
    })
    context.end();
    return response.failed(error);
  }
};
