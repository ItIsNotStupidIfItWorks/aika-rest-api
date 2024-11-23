/*
  Warnings:

  - You are about to drop the `_AppointmentToCompany` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "_AppointmentToCompany" DROP CONSTRAINT "_AppointmentToCompany_A_fkey";

-- DropForeignKey
ALTER TABLE "_AppointmentToCompany" DROP CONSTRAINT "_AppointmentToCompany_B_fkey";

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "companyID" INTEGER;

-- DropTable
DROP TABLE "_AppointmentToCompany";

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_companyID_fkey" FOREIGN KEY ("companyID") REFERENCES "Company"("companyID") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Appointment" ADD CONSTRAINT "Appointment_companyID_fkey" FOREIGN KEY ("companyID") REFERENCES "Company"("companyID") ON DELETE RESTRICT ON UPDATE CASCADE;
