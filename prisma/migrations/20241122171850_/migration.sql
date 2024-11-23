/*
  Warnings:

  - You are about to drop the column `companyID` on the `User` table. All the data in the column will be lost.
  - You are about to drop the `Owner` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Appointment" DROP CONSTRAINT "Appointment_creatorID_fkey";

-- DropForeignKey
ALTER TABLE "Company" DROP CONSTRAINT "Company_ownerID_fkey";

-- DropForeignKey
ALTER TABLE "User" DROP CONSTRAINT "User_companyID_fkey";

-- AlterTable
ALTER TABLE "User" DROP COLUMN "companyID";

-- DropTable
DROP TABLE "Owner";

-- CreateTable
CREATE TABLE "User_Company" (
    "userCompanyID" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "userID" INTEGER NOT NULL,
    "companyID" INTEGER NOT NULL,

    CONSTRAINT "User_Company_pkey" PRIMARY KEY ("userCompanyID")
);

-- AddForeignKey
ALTER TABLE "Company" ADD CONSTRAINT "Company_ownerID_fkey" FOREIGN KEY ("ownerID") REFERENCES "User"("userID") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "User_Company" ADD CONSTRAINT "User_Company_userID_fkey" FOREIGN KEY ("userID") REFERENCES "User"("userID") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "User_Company" ADD CONSTRAINT "User_Company_companyID_fkey" FOREIGN KEY ("companyID") REFERENCES "Company"("companyID") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Appointment" ADD CONSTRAINT "Appointment_creatorID_fkey" FOREIGN KEY ("creatorID") REFERENCES "User"("userID") ON DELETE RESTRICT ON UPDATE CASCADE;
