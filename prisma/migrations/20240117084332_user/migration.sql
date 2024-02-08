/*
  Warnings:

  - Made the column `staff_id` on table `user` required. This step will fail if there are existing NULL values in that column.
  - Made the column `student_id` on table `user` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "user" DROP CONSTRAINT "user_staff_id_fkey";

-- DropForeignKey
ALTER TABLE "user" DROP CONSTRAINT "user_student_id_fkey";

-- AlterTable
ALTER TABLE "user" ALTER COLUMN "staff_id" SET NOT NULL,
ALTER COLUMN "student_id" SET NOT NULL;

-- AddForeignKey
ALTER TABLE "user" ADD CONSTRAINT "user_staff_id_fkey" FOREIGN KEY ("staff_id") REFERENCES "staff"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "user" ADD CONSTRAINT "user_student_id_fkey" FOREIGN KEY ("student_id") REFERENCES "student"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
