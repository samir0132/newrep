/*
  Warnings:

  - You are about to drop the column `passwor` on the `account` table. All the data in the column will be lost.
  - Added the required column `password` to the `account` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "account" DROP COLUMN "passwor",
ADD COLUMN     "password" TEXT NOT NULL;
