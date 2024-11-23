/*
  Warnings:

  - You are about to drop the column `fullname` on the `User` table. All the data in the column will be lost.
  - Added the required column `firstName` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `identificationCode` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `lastName` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "User" DROP COLUMN "fullname",
ADD COLUMN     "firstName" TEXT NOT NULL,
ADD COLUMN     "identificationCode" TEXT NOT NULL,
ADD COLUMN     "lastName" TEXT NOT NULL;

-- CreateTable
CREATE TABLE "Company" (
    "companyID" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "companyName" TEXT NOT NULL,
    "adress" TEXT NOT NULL,
    "ownerID" INTEGER NOT NULL,

    CONSTRAINT "Company_pkey" PRIMARY KEY ("companyID")
);

-- CreateTable
CREATE TABLE "Owner" (
    "ownerID" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "firstName" TEXT NOT NULL,
    "lastName" TEXT NOT NULL,

    CONSTRAINT "Owner_pkey" PRIMARY KEY ("ownerID")
);

-- CreateTable
CREATE TABLE "Appointment" (
    "appointmentID" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "startTime" TIMESTAMP(3) NOT NULL,
    "endTime" TIMESTAMP(3),
    "title" TEXT,
    "description" TEXT,
    "handOverRequest" BOOLEAN NOT NULL,
    "creatorID" INTEGER NOT NULL,
    "userID" INTEGER,
    "companyID" INTEGER NOT NULL,

    CONSTRAINT "Appointment_pkey" PRIMARY KEY ("appointmentID")
);

-- CreateTable
CREATE TABLE "_AppointmentToCompany" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_AppointmentToCompany_AB_unique" ON "_AppointmentToCompany"("A", "B");

-- CreateIndex
CREATE INDEX "_AppointmentToCompany_B_index" ON "_AppointmentToCompany"("B");

-- AddForeignKey
ALTER TABLE "Company" ADD CONSTRAINT "Company_ownerID_fkey" FOREIGN KEY ("ownerID") REFERENCES "Owner"("ownerID") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Appointment" ADD CONSTRAINT "Appointment_creatorID_fkey" FOREIGN KEY ("creatorID") REFERENCES "Owner"("ownerID") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Appointment" ADD CONSTRAINT "Appointment_userID_fkey" FOREIGN KEY ("userID") REFERENCES "User"("userID") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_AppointmentToCompany" ADD CONSTRAINT "_AppointmentToCompany_A_fkey" FOREIGN KEY ("A") REFERENCES "Appointment"("appointmentID") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_AppointmentToCompany" ADD CONSTRAINT "_AppointmentToCompany_B_fkey" FOREIGN KEY ("B") REFERENCES "Company"("companyID") ON DELETE CASCADE ON UPDATE CASCADE;
