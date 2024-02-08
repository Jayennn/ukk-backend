/*
  Warnings:

  - A unique constraint covering the columns `[username]` on the table `student` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "student_username_key" ON "student"("username");
