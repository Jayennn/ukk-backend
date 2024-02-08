-- DropForeignKey
ALTER TABLE "user" DROP CONSTRAINT "user_staff_id_fkey";

-- DropForeignKey
ALTER TABLE "user" DROP CONSTRAINT "user_student_id_fkey";

-- AlterTable
ALTER TABLE "user" ALTER COLUMN "staff_id" DROP NOT NULL,
ALTER COLUMN "student_id" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "user" ADD CONSTRAINT "user_staff_id_fkey" FOREIGN KEY ("staff_id") REFERENCES "staff"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "user" ADD CONSTRAINT "user_student_id_fkey" FOREIGN KEY ("student_id") REFERENCES "student"("id") ON DELETE SET NULL ON UPDATE CASCADE;
