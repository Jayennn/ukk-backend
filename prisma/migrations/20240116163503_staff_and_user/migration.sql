/*
  Warnings:

  - You are about to alter the column `password` on the `student` table. The data in that column could be lost. The data in that column will be cast from `VarChar(150)` to `VarChar(100)`.

*/
-- CreateEnum
CREATE TYPE "Role" AS ENUM ('admin', 'operator');

-- AlterTable
ALTER TABLE "student" ALTER COLUMN "password" SET DATA TYPE VARCHAR(100);

-- CreateTable
CREATE TABLE "staff" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "address" VARCHAR(100) NOT NULL,
    "phone_number" VARCHAR(20) NOT NULL,

    CONSTRAINT "staff_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "user" (
    "id" SERIAL NOT NULL,
    "role" "Role" NOT NULL DEFAULT 'operator',
    "staff_id" INTEGER NOT NULL,
    "username" TEXT NOT NULL,
    "password" VARCHAR(100) NOT NULL,
    "createdAt" TIMESTAMPTZ(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMPTZ(3) NOT NULL,

    CONSTRAINT "user_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "user_staff_id_key" ON "user"("staff_id");

-- CreateIndex
CREATE UNIQUE INDEX "user_username_key" ON "user"("username");

-- AddForeignKey
ALTER TABLE "user" ADD CONSTRAINT "user_staff_id_fkey" FOREIGN KEY ("staff_id") REFERENCES "staff"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
