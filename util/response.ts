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
  createAzure = (status: any, data: any) => {
    return {
      status,
      headers: {
        "Access-Control-Allow-Origin": "*",
        'Content-Type': 'application/json'
      },
      body: data,
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

  failedAzure = (error: any) => {
    const {
      data = {
        message: error.message || "Internal Server Error",
      },
    } = error;

    logger.error({ error });

    return {
      status: error.data?.code || 500,
      body: data,
      headers: {
        'Content-Type': 'application/json'
      }
    };
  };
}

export default new Response();
