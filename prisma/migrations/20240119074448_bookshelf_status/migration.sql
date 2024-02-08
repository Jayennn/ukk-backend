/*
  Warnings:

  - The `role` column on the `user` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - A unique constraint covering the columns `[author_name]` on the table `author` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `description` to the `loan` table without a default value. This is not possible if the table is not empty.
  - Added the required column `due_date` to the `loan` table without a default value. This is not possible if the table is not empty.
  - Added the required column `loan_penalties` to the `loan` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "role" AS ENUM ('admin', 'operator', 'siswa');

-- CreateEnum
CREATE TYPE "loan_status" AS ENUM ('done', 'pending');

-- CreateEnum
CREATE TYPE "loan_detail_status" AS ENUM ('returned', 'pending', 'missing');

-- DropIndex
DROP INDEX "author_books_author_id_key";

-- DropIndex
DROP INDEX "book_category_id_key";

-- DropIndex
DROP INDEX "loan_student_id_key";

-- AlterTable
ALTER TABLE "author" ALTER COLUMN "updatedAt" SET DATA TYPE TIMESTAMP(3);

-- AlterTable
ALTER TABLE "author_books" ALTER COLUMN "updatedAt" SET DATA TYPE TIMESTAMP(3);

-- AlterTable
ALTER TABLE "book" ALTER COLUMN "updatedAt" SET DATA TYPE TIMESTAMP(3);

-- AlterTable
ALTER TABLE "category" ALTER COLUMN "updatedAt" SET DATA TYPE TIMESTAMP(3);

-- AlterTable
ALTER TABLE "loan" ADD COLUMN     "description" VARCHAR(255) NOT NULL,
ADD COLUMN     "due_date" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "loan_date" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "loan_penalties" TEXT NOT NULL,
ADD COLUMN     "loan_status" "loan_status" NOT NULL DEFAULT 'pending',
ALTER COLUMN "updatedAt" SET DATA TYPE TIMESTAMP(3);

-- AlterTable
ALTER TABLE "loan_details" ADD COLUMN     "description" VARCHAR(255),
ADD COLUMN     "loan_detail_status" "loan_detail_status" NOT NULL DEFAULT 'pending',
ALTER COLUMN "updatedAt" SET DATA TYPE TIMESTAMP(3);

-- AlterTable
ALTER TABLE "staff" ALTER COLUMN "updatedAt" SET DATA TYPE TIMESTAMP(3);

-- AlterTable
ALTER TABLE "student" ALTER COLUMN "name" SET DATA TYPE VARCHAR(50),
ALTER COLUMN "updatedAt" SET DATA TYPE TIMESTAMP(3);

-- AlterTable
ALTER TABLE "user" DROP COLUMN "role",
ADD COLUMN     "role" "role" NOT NULL DEFAULT 'siswa';

-- DropEnum
DROP TYPE "Role";

-- CreateTable
CREATE TABLE "shelf" (
    "id" SERIAL NOT NULL,
    "shelf_code" VARCHAR(100) NOT NULL,
    "createdAt" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "shelf_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "bookshelf" (
    "id" SERIAL NOT NULL,
    "shelf_id" INTEGER NOT NULL,
    "book_id" INTEGER NOT NULL,
    "createdAt" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "bookshelf_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "author_author_name_key" ON "author"("author_name");

-- AddForeignKey
ALTER TABLE "bookshelf" ADD CONSTRAINT "bookshelf_shelf_id_fkey" FOREIGN KEY ("shelf_id") REFERENCES "shelf"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "bookshelf" ADD CONSTRAINT "bookshelf_book_id_fkey" FOREIGN KEY ("book_id") REFERENCES "book"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
