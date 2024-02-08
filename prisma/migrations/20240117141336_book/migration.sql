/*
  Warnings:

  - You are about to alter the column `release_date` on the `book` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(20)`.
  - You are about to alter the column `name` on the `staff` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(25)`.
  - You are about to alter the column `name` on the `student` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(25)`.

*/
-- DropIndex
DROP INDEX "loan_details_loan_id_key";

-- AlterTable
ALTER TABLE "book" ALTER COLUMN "release_date" SET DATA TYPE VARCHAR(20);

-- AlterTable
ALTER TABLE "staff" ALTER COLUMN "name" SET DATA TYPE VARCHAR(25);

-- AlterTable
ALTER TABLE "student" ALTER COLUMN "name" SET DATA TYPE VARCHAR(25);
