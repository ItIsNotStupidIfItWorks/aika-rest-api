/*
  Warnings:

  - A unique constraint covering the columns `[identificationCode]` on the table `Company` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Company_identificationCode_key" ON "Company"("identificationCode");
