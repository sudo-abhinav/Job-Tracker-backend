/*
  Warnings:

  - You are about to drop the `UserSignup` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "jobData" DROP CONSTRAINT "jobData_userSignupId_fkey";

-- DropTable
DROP TABLE "UserSignup";

-- CreateTable
CREATE TABLE "userSignup" (
    "id" TEXT NOT NULL,
    "firstName" TEXT NOT NULL,
    "lastName" TEXT NOT NULL,
    "emailId" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updateAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "userSignup_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "userSignup_emailId_key" ON "userSignup"("emailId");

-- AddForeignKey
ALTER TABLE "jobData" ADD CONSTRAINT "jobData_userSignupId_fkey" FOREIGN KEY ("userSignupId") REFERENCES "userSignup"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
