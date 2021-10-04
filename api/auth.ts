import Response from "../util/response";

module.exports.getToken = async () => {
  try {
    return Response.create(200, {
      str: "Hello World",
    });
  } catch (error) {
    return Response.create(500, {
      err: error.message,
    });
  }
};
module.exports.getAnotherToken = async () => {
  try {
    return Response.create(200, {
      str: "Hello World",
    });
  } catch (error) {
    return Response.create(500, {
      err: error.message,
    });
  }
};
