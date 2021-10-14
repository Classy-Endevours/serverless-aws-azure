-- CreateTable
CREATE TABLE "reports" (
    "id" SERIAL NOT NULL,
    "description" TEXT NOT NULL,
    "attachmentURL" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "reports_id_key" ON "reports"("id");
