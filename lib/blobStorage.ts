import { BlobServiceClient } from "@azure/storage-blob";

export const uploadBlobStrorage = async (body) => {
  return new Promise(async (resolve, reject) => {
    try {
      const blobServiceClient = await BlobServiceClient.fromConnectionString(
        process.env.AZURE_CON_STRING
      );
      const containerClient = await blobServiceClient.getContainerClient(
        process.env.BLOB_CONTAINER
      );
      const blobName = `${body.Key}`; 
      const blockBlobClient = containerClient.getBlockBlobClient(blobName);
      const uploadBlobResponse = await blockBlobClient.upload(
        body.Body,
        body.Body.length
      );
      if (!uploadBlobResponse) throw new Error("Blob upload failed");
      resolve(blockBlobClient.url);
    } catch (error) {
      console.log({error});
      
      reject(error);
    }
  });
};
