/*
  Warnings:

  - You are about to drop the column `name` on the `loan_details` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[loan_id]` on the table `loan_details` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `book_id` to the `loan_details` table without a default value. This is not possible if the table is not empty.

*/
-- AlterEnum
ALTER TYPE "Role" ADD VALUE 'siswa';

-- AlterTable
ALTER TABLE "loan_details" DROP COLUMN "name",
ADD COLUMN     "book_id" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "user" ALTER COLUMN "role" SET DEFAULT 'admin',
ALTER COLUMN "staff_id" DROP NOT NULL,
ALTER COLUMN "student_id" DROP NOT NULL;

-- CreateTable
CREATE TABLE "category" (
    "id" SERIAL NOT NULL,
    "category_name" VARCHAR(20) NOT NULL,
    "createdAt" TIMESTAMPTZ(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMPTZ(3) NOT NULL,

    CONSTRAINT "category_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "author" (
    "id" SERIAL NOT NULL,
    "author_name" VARCHAR(20) NOT NULL,
    "phone_number" VARCHAR(20) NOT NULL,
    "address" VARCHAR(100) NOT NULL,
    "createdAt" TIMESTAMPTZ(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMPTZ(3) NOT NULL,

    CONSTRAINT "author_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "book" (
    "id" SERIAL NOT NULL,
    "book_title" VARCHAR(150) NOT NULL,
    "category_id" INTEGER NOT NULL,
    "release_date" TEXT NOT NULL,
    "createdAt" TIMESTAMPTZ(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMPTZ(3) NOT NULL,

    CONSTRAINT "book_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "author_books" (
    "id" SERIAL NOT NULL,
    "author_id" INTEGER NOT NULL,
    "book_id" INTEGER NOT NULL,
    "createdAt" TIMESTAMPTZ(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMPTZ(3) NOT NULL,

    CONSTRAINT "author_books_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "book_category_id_key" ON "book"("category_id");

-- CreateIndex
CREATE UNIQUE INDEX "author_books_author_id_key" ON "author_books"("author_id");

-- CreateIndex
CREATE UNIQUE INDEX "author_books_book_id_key" ON "author_books"("book_id");

-- CreateIndex
CREATE UNIQUE INDEX "loan_details_loan_id_key" ON "loan_details"("loan_id");

-- AddForeignKey
ALTER TABLE "book" ADD CONSTRAINT "book_category_id_fkey" FOREIGN KEY ("category_id") REFERENCES "category"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "author_books" ADD CONSTRAINT "author_books_author_id_fkey" FOREIGN KEY ("author_id") REFERENCES "author"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "author_books" ADD CONSTRAINT "author_books_book_id_fkey" FOREIGN KEY ("book_id") REFERENCES "book"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "loan_details" ADD CONSTRAINT "loan_details_book_id_fkey" FOREIGN KEY ("book_id") REFERENCES "book"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
