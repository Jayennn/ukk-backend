/*
  Warnings:

  - Added the required column `name` to the `Loan_details` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Loan_details" ADD COLUMN     "name" TEXT NOT NULL;
