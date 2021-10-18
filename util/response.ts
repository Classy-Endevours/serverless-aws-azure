
class Response {
   create = (status:any, data:any) => {
    return {
      statusCode: status,
      headers: {
        "Access-Control-Allow-Origin": "*",
      },
      body: JSON.stringify(data),
    };
  };
  
   failed = (error:any) => {
    const { data = {
      message: 'Internal Server Error'
    } } = error;
    console.log({error});
    
    return {
      statusCode: error.data?.code || 500,
      body: JSON.stringify(error)
    }
  }

}

export default new Response()