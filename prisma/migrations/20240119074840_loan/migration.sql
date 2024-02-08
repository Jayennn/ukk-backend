/*
  Warnings:

  - You are about to alter the column `loan_penalties` on the `loan` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(150)`.

*/
-- AlterTable
ALTER TABLE "loan" ALTER COLUMN "description" DROP NOT NULL,
ALTER COLUMN "loan_penalties" DROP NOT NULL,
ALTER COLUMN "loan_penalties" SET DATA TYPE VARCHAR(150);
