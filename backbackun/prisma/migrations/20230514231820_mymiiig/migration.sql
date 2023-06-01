/*
  Warnings:

  - Added the required column `totalprice` to the `tripshared` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "tripshared" ADD COLUMN     "totalprice" DOUBLE PRECISION NOT NULL;
