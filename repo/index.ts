import { PrismaClient } from "@prisma/client";
const instance = new PrismaClient();
class DatabaseModal {
    public db: any;
    constructor() {
        this.db = instance
    }
}

export const prisma = instance
export default DatabaseModal