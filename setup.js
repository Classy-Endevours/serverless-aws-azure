process.env.SOME_KEY = "some value";
process.env.JWKS_URI =
  "test";
process.env.TOKEN_ISSUER = " test";
process.env.AUDIENCE = "test";
process.env.DATABASE_URL = "postgresql://postgres:1234567890@localhost:5432/serverless_test";
process.env.imageUploadBucket = 'incident-manager-test'
process.env.BLOB_CONTAINER = `attachments-test-${new Date().getTime().toString().substring(0, 4)}`
