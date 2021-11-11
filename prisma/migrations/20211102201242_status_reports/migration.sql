-- CreateEnum
CREATE TYPE "statusEnum" AS ENUM ('new', 'inProgress', 'done', 'rejected');

-- CreateTable
CREATE TABLE "statusReports" (
    "id" SERIAL NOT NULL,
    "status" "statusEnum" NOT NULL,
    "comments" TEXT,
    "reportId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "statusReports_id_key" ON "statusReports"("id");

-- AddForeignKey
ALTER TABLE "statusReports" ADD CONSTRAINT "statusReports_reportId_fkey" FOREIGN KEY ("reportId") REFERENCES "reports"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
