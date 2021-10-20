import { AzureFunction, Context, HttpRequest } from '@azure/functions'
import { BlobServiceClient } from '@azure/storage-blob'
import { getBoundary, Parse } from 'parse-multipart'

const TYPE_360_VIDEO = '360Video'
const TYPE_PROPERTY = 'property'
const TYPE_PROFILE = 'profile'

const uploadFileToContainer = async (
   blobServiceClient: BlobServiceClient,
   file,
   id: string,
   container: string,
   randomCode: string
) => {
   if (!id) throw new Error('No id provided')
   if (!file) throw new Error('No file provided')

   const buffer = file.data
   const containerClient = await blobServiceClient.getContainerClient(container)
   const blobName = `${id}/${randomCode}/${file.filename}`
   const blockBlobClient = containerClient.getBlockBlobClient(blobName)
   try {
      const uploadBlobResponse = await blockBlobClient.upload(buffer, buffer.length)
      if (!uploadBlobResponse) throw new Error('Blob upload failed')
   } catch (error) {
      console.log('uploadFileToContainer() err: %s', error)
      throw error
   }
   console.log('Blob uploaded')
   return blockBlobClient.url
}

const getContainerName = (type: string): string => {
   switch (type) {
      case TYPE_360_VIDEO:
         if (!process.env['OriginalVideoContainer'])
            throw new Error('No env variable found for OriginalVideoContainer')
         return process.env['OriginalVideoContainer']
      case TYPE_PROPERTY:
         if (!process.env['OriginalImageContainer'])
            throw new Error('No env variable found for OriginalImageContainer')
         return process.env['OriginalImageContainer']
      case TYPE_PROFILE:
         if (!process.env['OriginalProfileImageContainer'])
            throw new Error('No env variable found for OriginalProfileImageContainer')
         return process.env['OriginalProfileImageContainer']
      default:
         throw new Error('Type does not match existing types')
   }
}

const sendQueueMessages = (data: any, type: string, context: Context) => {
   switch (type) {
      case TYPE_PROPERTY:
         context.bindings.propertyThumbnail = { ...data, label: 'thumbnail', size: 200 }
         context.bindings.propertySmall = { ...data, label: 'small', size: 400 }
         context.bindings.propertyMedium = { ...data, label: 'medium', size: 1200 }
         context.bindings.propertyLarge = { ...data, label: 'large', size: 1920 }
         break
      case TYPE_PROFILE:
         context.bindings.profileIcon = { ...data, label: 'icon', size: 50 }
         context.bindings.profileMedium = { ...data, label: 'thumbnail', size: 200 }
         context.bindings.profileThumbnail = { ...data, label: 'small', size: 400 }
         break
      default:
         throw new Error('Type does not match existing types')
   }
}

const httpTrigger: AzureFunction = async function (
   context: Context,
   req: HttpRequest
): Promise<any> {
   try {
      context.log('Started - Upload: ', context.invocationId)

      if (!req.query.type) throw new Error('No type parameter provided')
      if (!req.query.id) throw new Error('No id parameter provided')

      const boundary = getBoundary(req.headers['content-type'])
      const files = Parse(Buffer.from(req.body), boundary)

      const blobServiceClient = await BlobServiceClient.fromConnectionString(
         process.env['StorageConnectionString']
      )
      context.log('Connected to blob storage')

      const randomCode = Math.random().toString(36).substring(7)
      const type = req.query.type
      const id = req.query.id
      const container = getContainerName(type)
      context.log('Type: %s, ID: %s', type, id)

      const url = await uploadFileToContainer(
         blobServiceClient,
         files[0],
         id,
         container,
         randomCode
      )

      context.res = { body: { success: true, url, id, randomCode } }
      if (type !== TYPE_360_VIDEO) {
         sendQueueMessages({ url, id, randomCode }, type, context)
      }
      context.log('Stopped - Upload: ', context.invocationId)
   } catch (error) {
      console.error(error)
      context.res = { body: { sucess: false, data: error.message } }
   }
}

export default httpTrigger
