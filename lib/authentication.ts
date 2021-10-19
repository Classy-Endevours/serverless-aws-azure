"use strict";

import { verify } from "jsonwebtoken";
import util = require("util");
import jwksRSA = require("jwks-rsa");

import { UnAuthorized } from "../lib/breakers";

const { JWKS_URI = "" } = process.env;

export const jwksClient = jwksRSA({
  cache: true,
  rateLimit: true,
  jwksUri: JWKS_URI,
});

export const getSigningKey = util.promisify(jwksClient.getSigningKey);

export const verifyJwt = util.promisify(verify);

export const getToken = (event) => {
  const { Authorization: bearer } = event.headers ?? {};
  if (!bearer) {
    UnAuthorized();
  }

  const [, token] = bearer.match(/^Bearer (.*)$/) || [];
  if (!token) {
    UnAuthorized();
  }

  return token;
};

export const verifyToken = async (
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
    UnAuthorized();
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
