/*
  Warnings:

  - Added the required column `updatedAt` to the `loan` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `loan_details` table without a default value. This is not possible if the table is not empty.
  - Added the required column `alamat` to the `student` table without a default value. This is not possible if the table is not empty.
  - Added the required column `password` to the `student` table without a default value. This is not possible if the table is not empty.
  - Added the required column `phone_number` to the `student` table without a default value. This is not possible if the table is not empty.
  - Added the required column `username` to the `student` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "loan" ADD COLUMN     "createdAt" TIMESTAMPTZ(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updatedAt" TIMESTAMPTZ(3) NOT NULL;

-- AlterTable
ALTER TABLE "loan_details" ADD COLUMN     "createdAt" TIMESTAMPTZ(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updatedAt" TIMESTAMPTZ(3) NOT NULL;

-- AlterTable
ALTER TABLE "student" ADD COLUMN     "alamat" VARCHAR(100) NOT NULL,
ADD COLUMN     "password" VARCHAR(20) NOT NULL,
ADD COLUMN     "phone_number" INTEGER NOT NULL,
ADD COLUMN     "username" TEXT NOT NULL;
