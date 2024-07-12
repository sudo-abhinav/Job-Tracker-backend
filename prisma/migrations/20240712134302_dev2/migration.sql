/*
  Warnings:

  - A unique constraint covering the columns `[mobileNo]` on the table `userSignup` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "userSignup" ADD COLUMN     "mobileNo" TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "userSignup_mobileNo_key" ON "userSignup"("mobileNo");
