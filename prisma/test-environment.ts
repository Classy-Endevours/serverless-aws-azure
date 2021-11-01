import NodeEnvironment = require("jest-environment-node");
import randomString = require("randomstring");
import util = require("util");
const exec = util.promisify(require("child_process").exec);
import { PrismaClient } from "@prisma/client";

class PrismaTestEnvironment extends NodeEnvironment {
  public schema: any;
  public databaseUrl: any;
  public client: any;
  constructor(config) {
    super(config);

    // Generate a unique schema identifier for this test context
    this.schema = `test_${randomString.generate({
      length: 16,
      charset: "alphanumeric",
      capitalization: "lowercase",
    })}`;

    // Generate the pg connection string for the test schema
    this.databaseUrl = "postgresql://postgres:1234567890@localhost:5432/test";
    process.env.DATABASE_URL = this.databaseUrl;
    this.global.process.env.DATABASE_URL = this.databaseUrl;
    this.client = new PrismaClient();
  }

  async setup() {
    try {
      const str = `create schema if not exists ${this.schema}`;
      console.log({
        str,
      });
      await this.client.$executeRaw`${str}`;

      // Set the required environment variable to contain the connection string
      // to our database test schema
      const url = `${this.databaseUrl}?schema=${this.schema}`;
      process.env.DATABASE_URL = url;
      this.global.process.env.DATABASE_URL = url;
      await exec("yarn prisma:deploy");

      return super.setup();
    } catch (error) {
      console.log(error);
      console.log("SETUP ERROR");
      throw error;
    }
  }

  async teardown() {
    try {
      // Drop the schema after the tests have completed
      const str = `drop schema if exists ${this.schema} cascade`;
      console.log({
        teardown: str,
      });
      await this.client.$executeRaw`${str}`;
      await this.client.$disconnect();
    } catch (error) {
      console.log(error);
      console.log("TEARDOWN ERROR");
      throw error;
    }
  }
}

module.exports = PrismaTestEnvironment;
