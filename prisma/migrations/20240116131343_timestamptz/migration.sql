/*
  Warnings:

  - You are about to drop the `Loan` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Loan_details` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Student` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Loan" DROP CONSTRAINT "Loan_student_id_fkey";

-- DropForeignKey
ALTER TABLE "Loan_details" DROP CONSTRAINT "Loan_details_loan_id_fkey";

-- DropTable
DROP TABLE "Loan";

-- DropTable
DROP TABLE "Loan_details";

-- DropTable
DROP TABLE "Student";

-- CreateTable
CREATE TABLE "student" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "createdAt" TIMESTAMPTZ(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMPTZ(3) NOT NULL,

    CONSTRAINT "student_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "loan" (
    "id" SERIAL NOT NULL,
    "student_id" INTEGER NOT NULL,

    CONSTRAINT "loan_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "loan_details" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "loan_id" INTEGER NOT NULL,

    CONSTRAINT "loan_details_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "loan_student_id_key" ON "loan"("student_id");

-- AddForeignKey
ALTER TABLE "loan" ADD CONSTRAINT "loan_student_id_fkey" FOREIGN KEY ("student_id") REFERENCES "student"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "loan_details" ADD CONSTRAINT "loan_details_loan_id_fkey" FOREIGN KEY ("loan_id") REFERENCES "loan"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
