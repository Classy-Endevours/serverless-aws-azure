import response from "../util/response";

export const find = async () => {
  try {
        return response.create(200, {
          data: [],
        });
      } catch (error) {
        return response.create(500, {
          err: error.message,
        });
      }
};

export const save = async () => {
    try {
        return response.create(200, {
          data: {}
        });
      } catch (error) {
        return response.create(500, {
          err: error.message,
        });
      }
  };
  