/*
  Warnings:

  - You are about to drop the column `ownerID` on the `Company` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Company" DROP CONSTRAINT "Company_ownerID_fkey";

-- AlterTable
ALTER TABLE "Company" DROP COLUMN "ownerID";

-- AlterTable
ALTER TABLE "User_Company" ADD COLUMN     "owner" BOOLEAN NOT NULL DEFAULT false;
