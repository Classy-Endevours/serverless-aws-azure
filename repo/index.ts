import { PrismaClient } from "@prisma/client";
class DatabaseModal {
    public db: any;
    constructor() {
        this.db = new PrismaClient();
    }
}
export default DatabaseModal