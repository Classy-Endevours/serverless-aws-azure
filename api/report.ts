import response from "../util/response";
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export const find = async (event, contex) => {
  try {
        // const id 
        console.log({event});
        const where ={}
        if(event?.pathParameters?.id) {
          where.id = parseInt(event.pathParameters.id)
        }
        const data = await prisma.reports.findMany({where})
        return response.create(200, {
          data,
        });
      } catch (error) {
        return response.create(500, {
          err: error.message,
        });
      }
};

export const save = async (event, context) => {
    try {
        // const body = JSON.parse(event.body) 
        console.log({event});
        
        
        // const result = await prisma.reports.create({
        //   data:{
        //     attachmentURL: body.attachmentURL,
        //     description: body.description
        //   }
        // })
        return response.create(200, {
          data: {}
        });
      } catch (error) {
        return response.create(500, {
          err: error.message,
        });
      }
  };
  