/*
  Warnings:

  - You are about to drop the column `alamat` on the `student` table. All the data in the column will be lost.
  - Added the required column `address` to the `student` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "student" DROP COLUMN "alamat",
ADD COLUMN     "address" VARCHAR(100) NOT NULL,
ALTER COLUMN "phone_number" SET DATA TYPE VARCHAR(20);
