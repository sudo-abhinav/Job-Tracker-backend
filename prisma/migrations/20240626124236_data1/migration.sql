-- CreateTable
CREATE TABLE "UserSignup" (
    "id" TEXT NOT NULL,
    "firstName" TEXT NOT NULL,
    "lastName" TEXT NOT NULL,
    "emailId" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updateAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "UserSignup_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "jobData" (
    "Jobid" TEXT NOT NULL,
    "companyName" TEXT NOT NULL,
    "link" TEXT NOT NULL,
    "position" TEXT NOT NULL,
    "status" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updateAt" TIMESTAMP(3) NOT NULL,
    "userSignupId" TEXT NOT NULL,

    CONSTRAINT "jobData_pkey" PRIMARY KEY ("Jobid")
);

-- CreateIndex
CREATE UNIQUE INDEX "UserSignup_emailId_key" ON "UserSignup"("emailId");

-- AddForeignKey
ALTER TABLE "jobData" ADD CONSTRAINT "jobData_userSignupId_fkey" FOREIGN KEY ("userSignupId") REFERENCES "UserSignup"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
