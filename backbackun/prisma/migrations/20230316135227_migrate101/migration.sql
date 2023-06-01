/*
  Warnings:

  - Added the required column `status` to the `trip` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "trip" ADD COLUMN     "status" INTEGER NOT NULL;
