const path = require("path");
module.exports = {
  preset: "ts-jest",
  roots: ["<rootDir>/tests"],
  transform: {
    "^.+\\.ts?$": "ts-jest",
  },
  moduleFileExtensions: ["ts", "js", "json", "node"],
  coveragePathIgnorePatterns: ["/node_modules/"],
  collectCoverage: true,
  testEnvironment: "./prisma/test-environment.ts",
  setupFilesAfterEnv: ["<rootDir>/setupTests.ts"],
  setupFiles: [path.resolve(__dirname) + "/setup.js"],
};
