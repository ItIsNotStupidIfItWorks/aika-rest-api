-- AlterTable
ALTER TABLE "Company" ADD COLUMN     "primaryOwnerID" INTEGER NOT NULL DEFAULT 1;

-- AddForeignKey
ALTER TABLE "Company" ADD CONSTRAINT "Company_primaryOwnerID_fkey" FOREIGN KEY ("primaryOwnerID") REFERENCES "User"("userID") ON DELETE RESTRICT ON UPDATE CASCADE;
