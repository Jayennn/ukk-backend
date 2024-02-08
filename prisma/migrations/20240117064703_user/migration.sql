/*
  Warnings:

  - You are about to drop the column `password` on the `student` table. All the data in the column will be lost.
  - You are about to drop the column `username` on the `student` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[student_id]` on the table `user` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `updatedAt` to the `staff` table without a default value. This is not possible if the table is not empty.
  - Added the required column `student_id` to the `user` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "student_username_key";

-- AlterTable
ALTER TABLE "staff" ADD COLUMN     "createdAt" TIMESTAMPTZ(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updatedAt" TIMESTAMPTZ(3) NOT NULL;

-- AlterTable
ALTER TABLE "student" DROP COLUMN "password",
DROP COLUMN "username";

-- AlterTable
ALTER TABLE "user" ADD COLUMN     "student_id" INTEGER NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "user_student_id_key" ON "user"("student_id");

-- AddForeignKey
ALTER TABLE "user" ADD CONSTRAINT "user_student_id_fkey" FOREIGN KEY ("student_id") REFERENCES "student"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
