import logger from "../logger";

class Response {
  create = (status: any, data: any) => {
    return {
      statusCode: status,
      headers: {
        "Access-Control-Allow-Origin": "*",
      },
      body: JSON.stringify(data),
    };
  };

  failed = (error: any) => {
    const {
      data = {
        message: error.message || "Internal Server Error",
      },
    } = error;

    logger.error({ error });

    return {
      statusCode: error.data?.code || 500,
      body: JSON.stringify(data),
    };
  };
}

export default new Response();
